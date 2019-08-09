module api.v4.coupons;

import api.common;

import core.time;

import std.algorithm;
import std.array;

import vibe.inet.url;
import vibe.data.serialization;
import vibe.data.json;
import vibe.db.mongo.collection;

struct Coupon
{
	struct Barcode
	{
	@optional:
		string type;
		string value;
	}

@optional:
	mixin TileCommons;

	string description;
	string footnote;
	string price;
	string plu;
	Barcode[] barcodes;
	int[] categories;
	bool myBkOnly;

@ignore:
	static MongoCollection collection;
}

enum couponApiVersion = 4;
Json[] getBKCoupons()
{
	return requestBK!(Json[])(
			URL("https://api.burgerking.de/api/o2uvrPdUY57J5WwYs6NtzZ2Knk7TnAUY/v4/de/de/coupons/"),
			70.minutes);
}

void updateCoupons()
{
	auto coupons = getBKCoupons();
	auto ids = coupons.map!(a => a["id"].get!int).array;
	Coupon.collection.update(["id": ["$nin": ids]],
			["$set": ["_active": Json(false), "_order": Json(1000)]], UpdateFlags.multiUpdate);
	foreach (i, coupon; coupons)
	{
		coupon["_order"] = Json(cast(int) i);
		coupon["_apiVer"] = Json(couponApiVersion);
		coupon["_active"] = Json(true);
		Coupon.collection.update(["id": cast(long) coupon["id"].get!int], coupon, UpdateFlags.upsert);
	}
}

void cacheCoupon(Coupon coupon)
{
	cacheImages(coupon.images);
}
