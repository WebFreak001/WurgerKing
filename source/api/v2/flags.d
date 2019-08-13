module api.v2.flags;

import api.common;

import core.time;

import std.algorithm;
import std.array;

import vibe.core.log;
import vibe.data.bson : Bson;
import vibe.data.json : Json;
import vibe.db.mongo.collection;
import vibe.db.mongo.database;
import vibe.inet.url;

struct IconFlag
{
@optional:
	int id;
	string title;
	Images.Image icon;
	string color;
	Images.Image image;
}

struct ImageFlag
{
@optional:
	int id;
	string title;
	Images images;
}

static __gshared MongoDatabase flagsDB;

void fetchFlags(MongoDatabase db)
{
	foreach (region; bkRegions)
		fetchFlags(db, region);
}

void fetchFlags(MongoDatabase db, string region)
{
	region = region.normalizeRegion;
	flagsDB = db;

	logInfo("Fetching flags for region %s", region);
	auto flags = requestBK!(Json[][string])(
			URL("https://api.burgerking.de/api/o2uvrPdUY57J5WwYs6NtzZ2Knk7TnAUY/v2" ~ region ~ "flags/"),
			40.hours);

	db.saveFlags(flags, "productCategories", region);
	db.saveFlags(flags, "storeCategories", region);
	db.saveFlags(flags, "allergens", region);
	db.saveFlags(flags, "ingredients", region);
}

enum flagsApiVersion = 2;

private void saveFlags(MongoDatabase db, Json[][string] flags, string flag, string region)
{
	auto items = flags.get(flag, null);
	auto collection = db["flags_" ~ flag];

	if (!items.length)
	{
		collection.update(null, ["$set": ["_active": false]], UpdateFlags.multiUpdate);
		return;
	}

	auto ids = items.map!(a => Bson.fromJson(a.flagId)).array;
	collection.update([
			"_flagId": Bson(["$nin": Bson(ids)]),
			"_active": Bson(true),
			"_region": Bson(region)
			], ["$set": ["_active": false]], UpdateFlags.multiUpdate);

	foreach (item; items)
	{
		item["_apiVer"] = Json(flagsApiVersion);
		item["_active"] = Json(true);
		item["_flagId"] = item.flagId;
		item["_region"] = region[1 .. $ - 1];
		collection.update(["_flagId": item.flagId], item, UpdateFlags.upsert);
	}
}

private Json flagId(Json item)
{
	if (item.type != Json.Type.object)
		return Json.undefined;
	auto o = item.get!(Json[string]);
	if (auto id = "id" in o)
		return *id;
	else if (auto key = "key" in o)
		return *key;
	else if (auto key = "images" in o)
		return *key;
	else if (auto key = "icon" in o)
		return *key;
	else if (auto key = "title" in o)
		return *key;
	return Json.undefined;
}
