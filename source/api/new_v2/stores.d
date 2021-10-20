module api.new_v2.stores;

import api.common;

import core.time;

import std.algorithm;
import std.array;
import std.datetime.systime;
import std.typecons;
import std.format;

import vibe.core.log;
import vibe.inet.url;
import vibe.data.serialization;
import vibe.data.json;
import vibe.db.mongo.collection;

enum StoreItemType
{
	menu,
	product,
	customization,
	coupon,

	internalMeta = 100
}

struct StoreEntry
{
	static MongoCollection collection;
}

// list of stores that support mobile ordering (the needed API to expose coupons)
// if changing, change storecoupons.ts `numTotalStores = 50` variable to the new length.
static immutable int[] storeIDs = [
	1001, 1010, 1024, 1033, 1044, 1059, 11041, 11674, 11742, 11985, 12267,
	12971, 13237, 13948, 16017, 16018, 3057, 382, 393, 403, 409, 4108, 437, 441,
	455, 471, 486, 505, 512, 514, 550, 571, 578, 597, 627, 653, 682, 698, 711,
	714, 737, 744, 829, 848, 897, 929, 9447, 994, 995, 997
];
enum storeFormat = "https://mo.burgerking-app.eu/api/v2/stores/%d/menu";

void updateStores()
{
	enum ttl = 4.hours;
	enum metaVersion = 1;

	Bson meta = StoreEntry.collection.findOne(["_type": cast(int)StoreItemType.internalMeta]);
	if (meta.type == Bson.Type.object && meta["version"].get!int == metaVersion
		&& SysTime(meta["lastUpdate"].get!long) + ttl > Clock.currTime())
		return;

	scope (success)
		StoreEntry.collection.update(["_type": cast(int)StoreItemType.internalMeta], [
			"_type": Bson(cast(int)StoreItemType.internalMeta),
			"version": Bson(metaVersion),
			"lastUpdate": Bson(Clock.currStdTime)
		], UpdateFlags.upsert);

	scope string[] processedLanguages;

	foreach (region; bkRegions)
	{
		auto lang = region.normalizeRegion.regionGetLanguage;
		if (processedLanguages.canFind(lang))
			continue;
		processedLanguages ~= lang;

		foreach (storeID; storeIDs)
		{
			Json store = requestBK!Json(
					URL(format!storeFormat(storeID)),
					ttl,
					["Accept-Language": lang]);

			auto menu = store["menu"].get!(Json[]);
			auto products = store["products"].get!(Json[string]);
			auto customizations = store["customizations"].get!(Json[string]);
			auto coupons = store["coupons"].get!(Json[]);

			alias Type = StoreItemType;

			cacheEntries(lang, storeID, Type.menu, menu);
			cacheEntries(lang, storeID, Type.product, products.byValue);
			cacheEntries(lang, storeID, Type.customization, customizations
					.byValue);
			cacheEntries(lang, storeID, Type.coupon, coupons);
		}
	}
}

private void cacheEntries(T)(string lang, int storeID, StoreItemType type, T range)
{
	logInfo("Updating store %d %s for language %s", storeID, type, lang);

	Bson[] ids = range.map!(a => Bson(a["id"].get!long)).array;
	auto deleteQuery = [
		"id": Bson(["$nin": Bson(ids)]),
		"_active": Bson(true),
		"_store": Bson(storeID),
		"_type": Bson(cast(int) type)
	];
	if (lang.length)
		deleteQuery["_lang"] = Bson(lang);

	StoreEntry.collection.update(deleteQuery, [
			"$set": ["_active": Bson(false)]
			], UpdateFlags.multiUpdate);

	auto now = Clock.currTime();

	size_t i = -1;
	foreach (item; range)
	{
		i++;
		item["_apiVer"] = Json(1);
		bool active = true;

		if (auto to = "start_date" in item)
			if (to.type == Json.Type.string)
				active = active && now < SysTime.fromISOExtString(to.get!string);

		if (auto from = "expiration_date" in item)
			if (from.type == Json.Type.string)
				active = active && now > SysTime.fromISOExtString(from.get!string);

		item["_active"] = Json(active);
		item["_store"] = Json(storeID);
		item["_type"] = Json(cast(int) type);
		if (lang.length)
			item["_lang"] = Json(lang);
		StoreEntry.collection.update([
				"id": item["id"],
				"_store": item["_store"],
				"_type": item["_type"],
				"_lang": item["_lang"]
				], item, UpdateFlags.upsert);
	}
	logInfo("Upserted %s store %d %s for language %s", i, storeID, type, lang);
}

struct StoreCoupon
{
	struct Product
	{
		int id;
		string image_url;
		string availability_type;
	}

	string humanCode, promoCode;
	string name;
	int[] prices;
	int[] stores;
	Product product;

	bool constantPrice() const @property
	{
		return prices[1 .. $].all!(p => p == prices[0]);
	}

	int[2] priceRange() const @property
	{
		int[2] ret = [prices[0], prices[0]];
		foreach (i; 1 .. prices.length)
		{
			ret[0] = min(ret[0], prices[i]);
			ret[1] = max(ret[1], prices[i]);
		}
		return ret;
	}

	static StoreCoupon fromAggregate(Bson agg)
	{
		StoreCoupon ret;
		ret.humanCode = agg["_id"]["code"].get!string;
		ret.promoCode = agg["_id"]["promo_code"].get!string;
		ret.name = agg["_id"]["name"].get!string;
		ret.prices = agg["prices"].get!(Bson[])
			.map!(b => cast(int) b.get!long)
			.array;
		ret.stores = agg["stores"].get!(Bson[])
			.map!(b => cast(int) b.get!long)
			.array;
		ret.product.availability_type = agg["product"]["availability_type"].get!string;
		ret.product.id = cast(int) agg["product"]["id"].get!long;
		ret.product.image_url = agg["product"]["image_url"].get!string;
		return ret;
	}
}

StoreCoupon[][string] findStoreCoupons(string lang)
{
	// https://gist.github.com/WebFreak001/17e98fd66b700b58cd510c8cfad28655
	auto coupons = StoreEntry.collection.aggregate(
			[
			Bson([
					"$match": Bson([
						"_lang": Bson(lang),
						"_type": Bson(cast(int) StoreItemType.coupon),
						"store_promo_code": Bson([
							"$regex": Bson(`^\s*[A-Z]\d+\s*$`)
						])
					])
				]),
			Bson([
					"$lookup": Bson([
						"from": Bson("stores"),
						"let": ["pid": "$product_id", "sid": "$_store", "lang": "$_lang"]
						.serializeToBson,
						"pipeline": Bson([
							Bson([
								"$match": Bson(
								["$expr": Bson(["$and": Bson([
											Bson(
											["$eq": Bson([Bson("$_type"), Bson(1)])]),
											Bson(
											["$eq": Bson([Bson("$_store"), Bson("$$sid")])]),
											Bson(["$eq": Bson([Bson("$id"), Bson(
													"$$pid")])]),
											Bson(
											["$eq": Bson([Bson("$_lang"), Bson("$$lang")])]),
										])])])
							]),
							Bson([
								"$project": Bson([
									"combo_groups": Bson(0)
								])
							])
						]),
						"as": Bson("product")
					])
				]),
			Bson([
					"$unwind": Bson("$product")
				]),
			Bson(
				[
					"$group": Bson(
					[
						"_id": Bson([
							"code": Bson("$store_promo_code"),
							"name": Bson("$product.name"),
							"_lang": Bson("$_lang"),
							"promo_code": Bson("$promo_code")
						]),
						"prices": Bson(["$push": Bson("$product.price")]),
						"stores": Bson(["$push": Bson("$_store")]),
						"product": Bson(["$first": Bson("$product")]),
					])
				]),
			Bson([
					"$sort": Bson(["_id.code": Bson(1)])
				]),
			Bson([
					"$group": Bson([
						"_id": Bson(
						[
							"$substr": Bson([Bson("$_id.code"), Bson(0), Bson(1)])
						]),
						"coupons": Bson(["$push": Bson("$$CURRENT")])
					])
				]),
			],
			AggregateOptions.init
	);
	typeof(return) ret;
	foreach (group; coupons)
	{
		string id = group["_id"].get!string;
		if (!id.length)
			continue;

		ret[id] = group["coupons"].get!(Bson[])
			.map!(coupon => StoreCoupon.fromAggregate(coupon))
			.array;
	}
	return ret;
}

version (none)
unittest
{
	import vibe.db.mongo.mongo;

	auto db = connectMongoDB("mongodb://127.0.0.1").getDatabase("wurgerking");
	StoreEntry.collection = db["stores"];

	auto parts = findStoreCoupons("de");
	foreach (group, coupons; parts)
	{
		logInfo("%s:", group);
		foreach (StoreCoupon coupon; coupons)
		{
			if (!coupon.constantPrice)
				logInfo("%s has unconstant prices: %s", coupon.humanCode, coupon.prices.array.sort!"a<b".uniq);
			if (coupon.stores.length != storeIDs.length)
				logInfo("%s only supported by %s / %s stores", coupon.humanCode, coupon.stores.length, storeIDs.length);
			if (coupon.product.availability_type != "available")
				logInfo("%s unexpected availability: %s", coupon.humanCode, coupon.product.availability_type);
		}
	}
}
