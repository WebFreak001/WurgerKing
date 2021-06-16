module api.new_v2.coupons;

import api.common;

import core.time;

import std.algorithm;
import std.array;
import std.typecons;

import vibe.inet.url;
import vibe.data.serialization;
import vibe.data.json;
import vibe.db.mongo.collection;

struct Coupon
{
	struct UpsellCoupon
	{
		int id;
		string price_text;
		string image_url;
		string title;
		string subline;
	}

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
	Nullable!int upsell_coupon_id;
	Coupon.UpsellCoupon[] upsell_coupons;
	bool hidden, secret;
	bool _active, _promo, _hasParent;

@ignore:
	static MongoCollection collection;
}

struct APICoupon
{
@optional:
	int id;
	bool hidden;
	string price_text;
	bool login_required;
	bool onetime;
	string plu;
	bool secret;
	string footnote;
	string updated_at;
	string start_date;
	string expiration_date;
	Dimension dimension;
	Coupon.Barcode[] barcodes;
	string title;
	string subline;
	string image_url;
	int[] category_ids;
	Nullable!int upsell_coupon_id;
	Coupon.UpsellCoupon[] upsell_coupons;
	bool _promo;

@ignore:
	Coupon convert()
	{
		import std.datetime.systime;

		Coupon ret;
		ret.id = id;
		ret.hidden = hidden;
		ret.price = price_text;
		ret.myBkOnly = login_required;
		ret.myBkOnetime = onetime;
		ret.plu = plu;
		ret.secret = secret;
		ret.footnote = footnote;
		ret.from = SysTime.fromISOExtString(start_date).toUnixTime!long;
		ret.to = SysTime.fromISOExtString(expiration_date).toUnixTime!long;
		ret.dimension = dimension;
		ret.barcodes = barcodes;
		ret.title = title;
		ret.description = subline;
		ret.images.bgImage = Images.Image(image_url);
		ret.categories = category_ids;
		ret.upsell_coupon_id = upsell_coupon_id;
		ret.upsell_coupons = upsell_coupons;
		ret._promo = _promo;
		return ret;
	}
}

struct APICouponResult
{
	Json[] coupons;
	Json[] promos;

	Json[] flatten()
	{
		Json[] prepend;
		auto ret = coupons;
		foreach (promo; promos)
		{
			bool top = true;
			if (auto pos = "position" in promo)
				if (pos.type == Json.Type.string)
					if (pos.get!string == "bottom")
						top = false;

			if ("id" in promo)
				promo["id"] = promo["id"].get!int | 0x4000_0000;
			promo["_promo"] = Json(true);

			if (top)
				prepend ~= promo;
			else
				ret ~= promo;
		}
		return prepend ~ ret;
	}
}

mixin ComplexCachable!(APICouponResult, APICoupon, 10_2, 1,
		"https://mo.burgerking-app.eu/api/v2/coupons/", 70.minutes,
		Localizable.acceptLanguageHeader) couponApi;

enum couponApiVersion = couponApi.bkApiVersion;
alias updateCoupons = couponApi.updateItems;

void cacheCoupon(Coupon coupon)
{
	cacheImages(coupon.images);

	foreach (upsell; coupon.upsell_coupons)
		if (upsell.image_url.length)
			proxyImage(upsell.image_url);
}

void proxyCoupon(ref Coupon coupon) @safe
{
	proxyImages(coupon.images);

	foreach (ref upsell; coupon.upsell_coupons)
		if (upsell.image_url.length)
			upsell.image_url = proxyImage(upsell.image_url);
}
