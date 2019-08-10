module api.v2.promos;

import api.common;

import core.time;

import std.algorithm;
import std.array;

import vibe.inet.url;
import vibe.data.serialization;
import vibe.data.json;
import vibe.db.mongo.collection;

struct Promo
{
@optional:
	mixin ItemCommons;

	string description;
	string footnote;
	long[] products;
	string storesFilter;

@ignore:
	static MongoCollection collection;
}

mixin GenericCachable!(Promo, 2, 0,
		"https://api.burgerking.de/api/o2uvrPdUY57J5WwYs6NtzZ2Knk7TnAUY/v2/de/de/promos/", 120.minutes) promoApi;

enum promoApiVersion = promoApi.bkApiVersion;
alias getBKPromos = promoApi.getBKAPI;
alias updatePromos = promoApi.updateItems;

void cachePromo(Promo item)
{
	cacheImages(item.images);
}
