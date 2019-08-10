module api.public_.impl;

import api.common;
import api.public_.definition;
import api.v2.flags;
import api.v2.promos;
import api.v4.coupons;

import std.algorithm;
import std.array;
import std.ascii;
import std.datetime.systime;

import vibe.core.log;
import vibe.data.json;
import vibe.db.mongo.cursor;

class PublicAPIImpl : PublicAPI
{
	Coupon[][] getCoupons(int[] filterCategories = null, bool onlyActive = true,
			bool hideExpired = false, int limit = 100, bool allGeo = false,
			int[] filterIds = null, bool mybk = false) @safe
	{
		if (limit < 1)
			limit = 1;
		else if (limit > 100)
			limit = 100;

		Bson[string] query;
		query["_apiVer"] = Bson(couponApiVersion);
		if (onlyActive)
			query["_active"] = Bson(true);
		if (hideExpired)
			query["to"] = Bson([
					"$gte": Bson(Clock.currTime.toUnixTime!long - 6 * 60 * 60)
					]); // give 6 hours buffer
		if (filterCategories.length)
			query["categories"] = Bson(["$in": serializeToBson(filterCategories)]);
		if (!allGeo)
			query["geo"] = Bson(["$ne": Bson(true)]);
		if (filterIds.length)
			query["id"] = Bson(["$in": serializeToBson(filterIds)]);

		if (mybk)
		{
			Bson[string] other = query.dup;
			query["myBkOnly"] = Bson(true);
			other["myBkOnetime"] = Bson(true);

			query = ["$or": Bson([Bson(query), Bson(other)])];
		}

		return Coupon.collection.find(query).sort(["_order": 1, "to": -1]).limit(limit).map!((a) {
			auto ret = a.deserializeBson!Coupon;
			proxyImages(ret.images);
			return ret;
		}).array.compactRows.byRows.array;
	}

	Promo[] getPromos(string filterStore = null, bool onlyActive = true, int limit = 100) @safe
	{
		if (limit < 1)
			limit = 1;
		else if (limit > 100)
			limit = 100;

		Bson[string] query;
		query["_apiVer"] = Bson(promoApiVersion);
		if (onlyActive)
			query["_active"] = Bson(true);
		if (filterStore.length)
			query["storesFilter"] = Bson(filterStore);

		return Promo.collection.find(query).sort(["_order": 1]).limit(limit).map!((a) {
			auto ret = a.deserializeBson!Promo;
			proxyImages(ret.images);
			return ret;
		}).array;
	}

	Json[][string] getFlags(string[] flags, bool onlyActive = true)
	{
		Bson[string] query;
		query["_apiVer"] = Bson(flagsApiVersion);
		if (onlyActive)
			query["_active"] = Bson(true);

		Json[][string] ret;
		foreach (flag; flags)
			if (flag.all!isAlphaNum && flag.length >= 2 && flag.length < 40)
				ret[flag] = flagsDB["flags_" ~ flag].find(query).map!((a) {
					auto ret = a.toJson.get!(Json[string]);

					static foreach (imageName; ["icon", "image"])
						if (auto icon = imageName in ret)
							(*icon)["url"] = Json(proxyImage((*icon)["url"].get!string));

					if (auto images = "images" in ret)
						static foreach (part; ["fgImage", "bgImage"])
							if (auto img = part in *images)
								if (img.type == Json.Type.object)
									(*img)["url"] = Json(proxyImage((*img)["url"].get!string));

					return Json(ret);
				}).array;
		return ret;
	}
}
