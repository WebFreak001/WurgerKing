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
	bool myBkOnetime;
	bool _active;

@ignore:
	static MongoCollection collection;
}

mixin GenericCachable!(Coupon, 4, 1,
		"https://api.burgerking.de/api/o2uvrPdUY57J5WwYs6NtzZ2Knk7TnAUY/v4/de/de/coupons/", 70.minutes) couponApi;

enum couponApiVersion = couponApi.bkApiVersion;
alias updateCoupons = couponApi.updateItems;

void cacheCoupon(Coupon coupon)
{
	cacheImages(coupon.images);
}
