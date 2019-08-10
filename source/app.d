import vibe.vibe;

import api.common;
import api.public_.impl;
import api.v2.promos;
import api.v3.tiles;
import api.v4.coupons;

import std.typecons;

void main()
{
	auto settings = new HTTPServerSettings;
	settings.port = 3000;
	settings.bindAddresses = ["::1", "0.0.0.0"];

	auto db = connectMongoDB("mongodb://127.0.0.1").getDatabase("wurgerking");

	Coupon.collection = db["coupons"];
	Coupon.collection.ensureIndex([tuple("id", 1)], IndexFlags.unique);

	Promo.collection = db["promos"];
	Promo.collection.ensureIndex([tuple("id", 1)], IndexFlags.unique);

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
		foreach (tile; getBKTiles())
			tile.cacheTile();
		updateCoupons();
		updatePromos();
	});

	setTimer(80.minutes, { updateCoupons(); }, true);
	setTimer(130.minutes, { updatePromos(); }, true);

	runApplication();
}

void index(HTTPServerRequest req, HTTPServerResponse res)
{
	string username = "Jan";
	auto tiles = getBKTiles().byRows;
	res.render!("home.dt", username, tiles);
}
