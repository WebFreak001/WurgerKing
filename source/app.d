import vibe.vibe;

import api.common;
import api.public_.impl;
import api.v2.flags;
import api.v2.promos;
import api.v3.tiles;
import api.v4.coupons;

import std.algorithm;
import std.base64;
import std.digest.sha;
import std.random;
import std.string;
import std.traits;
import std.typecons;

void deleteIndex(MongoCollection coll, string id)
{
	try
	{
		Coupon.collection.dropIndex(id);
	}
	catch (Exception e)
	{
		logInfo("Previous index not deleted because %s", e.msg);
	}
}

void main()
{
	auto settings = new HTTPServerSettings;
	settings.port = 3000;
	settings.bindAddresses = ["::1", "0.0.0.0"];

	auto db = connectMongoDB("mongodb://127.0.0.1").getDatabase("wurgerking");

	Coupon.collection = db["coupons"];
	Coupon.collection.deleteIndex("id_1");
	Coupon.collection.ensureIndex([tuple("id", 1), tuple("_region", 1)], IndexFlags.unique);

	Promo.collection = db["promos"];
	Promo.collection.deleteIndex("id_1");
	Promo.collection.ensureIndex([tuple("id", 1), tuple("_region", 1)], IndexFlags.unique);

	auto router = new URLRouter;

	router.registerRestInterface(new PublicAPIImpl(), "/api");

	if (!existsFile("public/cache"))
		createDirectory("public/cache");

	router.get("/", &index);
	HTTPFileServerSettings cacheSettings = new HTTPFileServerSettings("/cache");
	cacheSettings.maxAge = 365.days;
	router.get("/cache/*", serveStaticFiles("public/cache", cacheSettings));
	HTTPFileServerSettings swSettings = new HTTPFileServerSettings();
	swSettings.maxAge = Duration.zero;
	swSettings.preWriteCallback = delegate(scope HTTPServerRequest req,
			scope HTTPServerResponse res, ref string physicalPath) {
		res.headers["Cache-Control"] = "no-cache";
	};
	router.get("/sw.js", serveStaticFile("public/sw.js", swSettings));
	router.get("*", serveStaticFiles("public"));
	listenHTTP(settings, router);

	runTask({
		logInfo("Pre-caching tiles");
		foreach (region; bkRegions)
			foreach (tile; getBKTiles(region))
				tile.cacheTile();

		updateCoupons();
		updatePromos();

		fetchFlags(db);
	});

	setTimer(80.minutes, { updateCoupons(); }, true);
	setTimer(130.minutes, { updatePromos(); }, true);
	setTimer(2.days, { fetchFlags(db); }, true);

	runApplication();
}

struct TranslationContext
{
	alias languages = regionLanguages;
	mixin translationModule!"texts";
}

void index(HTTPServerRequest req, HTTPServerResponse res)
{
	string region = req.query.get("region");
	if (!region.length)
		region = req.headers.get("X-Region");
	if (!region.length)
		region = req.cookies.get("bkregion");
	if (!region.length)
		region = determineLanguageByHeader(req, regionLanguages);

	auto index = regionLanguages.countUntil(region);
	if (index >= 0)
		region = bkRegions[index];

	region = region.normalizeRegion;
	if (!bkRegions.canFind(region))
		region = defaultBkRegion;

	string lang = regionLanguages[bkRegions.countUntil(region)];

	string[string] translations;
	static foreach (language; regionLanguages)
	{
		if (lang == language)
		{
			enum langComponents = __traits(getMember, TranslationContext, language ~ "_texts");
			foreach (message; langComponents.messages)
				translations[message.key] = message.value;
		}
	}

	Json languageMap = Json.emptyArray;
	foreach (i, langId; regionLanguages)
		languageMap.appendArrayElement(Json([
					"id": Json(langId),
					"name": Json(regionNames[i])
				]));

	const translationsScript = "var region = " ~ serializeToJsonString(
			region[1 .. $ - 1]) ~ "; var language = " ~ serializeToJsonString(lang)
		~ "; var availableLanguages = " ~ languageMap.toString
		~ "; var translations = " ~ serializeToJsonString(translations);
	string nonce = uniform!ulong.to!string(36);

	auto tiles = getBKTiles(region).byRows;
	res.render!("home.dt", tiles, region, lang, translationsScript, nonce);
}
