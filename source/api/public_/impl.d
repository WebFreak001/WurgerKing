module api.public_.impl;

import api.common;
import api.public_.definition;
import api.v4.coupons;

import std.algorithm;
import std.array;

import vibe.db.mongo.cursor;
import vibe.core.log;

class PublicAPIImpl : PublicAPI
{
	Coupon[][] getCoupons(int[] filterCategories = null, bool onlyActive = true, int limit = 100) @safe
	{
		if (limit < 1)
			limit = 1;
		else if (limit > 100)
			limit = 100;
		Bson[string] query;
		query["_apiVer"] = Bson(couponApiVersion);
		if (onlyActive)
			query["_active"] = Bson(true);
		if (filterCategories.length)
			query["categories"] = Bson(["$in": serializeToBson(filterCategories)]);
		return Coupon.collection.find(query).sort(["_order": 1]).limit(limit).map!((a) {
			auto ret = a.deserializeBson!Coupon;
			if (!ret.images.bgImage.isNull)
				ret.images.bgImage.url = proxyImage(ret.images.bgImage.url);
			if (!ret.images.fgImage.isNull)
				ret.images.fgImage.url = proxyImage(ret.images.fgImage.url);
			return ret;
		}).byRows.array;
	}
}
