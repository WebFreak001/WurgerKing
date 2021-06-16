module api.common;

public import api.cache;

import vibe.data.serialization;

import core.time;

import std.algorithm;
import std.array;
import std.base64;
import std.range;
import std.string;
import std.typecons;

static immutable string[] bkRegions = [
	"/de/de/", "/de/en/"
];
static immutable string defaultBkRegion = bkRegions[1];

// de_DE, nl_NL, sv_SE, etc
static immutable string[] regionLanguages = bkRegions.map!(
		a => a[4 .. 6] ~ '_' ~ a[1 .. 3].toUpper).array;

static immutable string[] regionNames = [
	"Deutschland", "Germany"
];
static assert(regionNames.length == regionLanguages.length);

static immutable string token = (cast(string) Base64.decode(
		"bzJ1dnIKUGRVWQo1N0o1Vwp3WXM2Tgp0eloyS24KazdUbgpBVVk=").idup).lineSplitter.join();

struct Images
{
	struct Image
	{
		string url;
		@optional long modified;
	}

@optional:
	Nullable!Image bgImage;
	Nullable!Image fgImage;
	bool parallax;
	string bgColor;
}

mixin template ItemCommons()
{
	import std.typecons : Nullable;

	int id;
	long modified;
	string title;
	Images images;
	Nullable!long from;
	Nullable!long to;
}

mixin template TileCommons()
{
	Dimension dimension;
	mixin ItemCommons;
}

struct Dimension
{
	int width = 2, height = 2;
}

void cacheImages(Images images) @safe
{
	if (!images.bgImage.isNull)
		proxyImage(images.bgImage.get.url);
	if (!images.fgImage.isNull)
		proxyImage(images.fgImage.get.url);
}

void proxyImages(ref Images images) @safe
{
	if (!images.bgImage.isNull)
		images.bgImage.get.url = proxyImage(images.bgImage.get.url);
	if (!images.fgImage.isNull)
		images.fgImage.get.url = proxyImage(images.fgImage.get.url);
}

enum isTilable(T) = __traits(hasMember, T.init, "dimension")
	&& is(typeof(__traits(getMember, T.init, "dimension")) : Dimension);

auto compactRows(Tile)(Tile[] tiles) if (isTilable!Tile)
{
	int sum = 0;
	for (size_t i = 0; i < tiles.length; i++)
	{
		auto w = tiles[i].dimension.width;
		if (sum + w <= 4)
			sum = (sum + w) % 4;
		else
		{
			for (size_t j = i + 1; j < tiles.length; j++)
			{
				auto o = tiles[j].dimension.width;
				if (sum + o <= 4)
				{
					sum = (sum + o) % 4;
					auto save = tiles[j];
					// move up all elements by 1, then move last element to first
					for (size_t n = j; n > i; n--)
						tiles[n] = tiles[n - 1];
					tiles[i] = save;
					break;
				}
			}
		}
	}

	return tiles;
}

auto byRows(Tiles)(Tiles tiles)
		if (isInputRange!Tiles && isTilable!(ElementType!Tiles))
{
	alias Tile = ElementType!Tiles;
	static struct RowIterator
	{
		Tiles tiles;
		// longer than possible 4 because of hidden items
		Tile[16] row;
		enum maxRowSpace = 4;
		int rowLength = 0;
		Tile[] front;

		static if (__traits(hasMember, Tiles.init, "save"))
			auto save()
			{
				return RowIterator(tiles.save, row, rowLength, front);
			}

		void popFront()
		{
			if (tiles.empty)
			{
				if (rowLength == 0)
					assert(false, "already empty");
				else
					rowLength = 0;
				return;
			}

			rowLength = 1;
			row[0] = tiles.front;
			tiles.popFront;
			int sum = row[0].effectiveWidth;
			while (sum < maxRowSpace && rowLength < maxRowSpace && !tiles.empty)
			{
				if (sum + tiles.front.effectiveWidth > maxRowSpace)
					break;
				row[rowLength++] = tiles.front;
				tiles.popFront;
				sum += row[rowLength - 1].effectiveWidth;
			}
			front = row[0 .. rowLength].dup;
		}

		bool empty() @property
		{
			return tiles.empty && rowLength == 0;
		}
	}

	auto ret = RowIterator(tiles);
	if (!ret.empty)
		ret.popFront();
	return ret;
}

private int effectiveWidth(Tile)(Tile tile)
{
	static if (is(typeof(tile.hidden)))
	{
		if (tile.hidden)
			return 0;
	}
	return tile.dimension.width;
}

unittest
{
	struct SimpleTile
	{
		Dimension dimension;
		int id;
	}

	SimpleTile[] tiles = [
		SimpleTile(Dimension(1, 1), 1), SimpleTile(Dimension(1, 1), 2),
		SimpleTile(Dimension(2, 1), 3), SimpleTile(Dimension(2, 2), 4),
		SimpleTile(Dimension(2, 2), 5), SimpleTile(Dimension(4, 2), 6),
		SimpleTile(Dimension(1, 2), 7), SimpleTile(Dimension(2, 2), 8),
		SimpleTile(Dimension(1, 2), 9), SimpleTile(Dimension(1, 2), 10)
	];
	auto rows = tiles.byRows;
	assert(rows.front.length == 3);
	assert(rows.front[0].id == 1);
	assert(rows.front[1].id == 2);
	assert(rows.front[2].id == 3);
	rows.popFront();
	assert(rows.front.length == 2);
	assert(rows.front[0].id == 4);
	assert(rows.front[1].id == 5);
	rows.popFront();
	assert(rows.front.length == 1);
	assert(rows.front[0].id == 6);
	rows.popFront();
	assert(rows.front.length == 3);
	assert(rows.front[0].id == 7);
	assert(rows.front[1].id == 8);
	assert(rows.front[2].id == 9);
	rows.popFront();
	assert(rows.front.length == 1);
	assert(rows.front[0].id == 10);
	rows.popFront();
	assert(rows.empty);

	// test gap compression (2, 4, 2)
	tiles = [
		SimpleTile(Dimension(4, 4), 1), SimpleTile(Dimension(2, 2), 2),
		SimpleTile(Dimension(4, 4), 3), SimpleTile(Dimension(2, 2), 4),
		SimpleTile(Dimension(4, 4), 5),
	];
	rows = tiles.compactRows.byRows;
	assert(rows.front.length == 1);
	assert(rows.front[0].id == 1);
	rows.popFront();
	assert(rows.front.length == 2);
	assert(rows.front[0].id == 2);
	assert(rows.front[1].id == 4);
	rows.popFront();
	assert(rows.front.length == 1);
	assert(rows.front[0].id == 3);
	rows.popFront();
	assert(rows.front.length == 1);
	assert(rows.front[0].id == 5);
	rows.popFront();
	assert(rows.empty);
}

string normalizeRegion(string region)
{
	if (region.length)
	{
		if (!region.startsWith("/"))
			region = "/" ~ region;
		if (!region.endsWith("/"))
			region = region ~ "/";
	}
	return region;
}

string regionGetLanguage(string region)
{
	if (region.length == "/de/de/".length)
		return region[4 .. 6];
	else
		return region;
}

enum Localizable
{
	no,
	replaceDeDe,
	acceptLanguageHeader
}

mixin template GenericCachable(T, int apiVersion, int subApiVersion,
		string endpoint, Duration ttl, alias localizable = Localizable.replaceDeDe)
{
	mixin ComplexCachable!(Json[], T, apiVersion, subApiVersion, endpoint, ttl, localizable);
}

mixin template ComplexCachable(APIResult, T, int apiVersion, int subApiVersion,
		string endpoint, Duration ttl, alias localizable = Localizable.replaceDeDe)
{
	enum bkApiVersion = apiVersion;
	enum bkSubApiVersion = subApiVersion;

	APIResult getBKAPI(string region)
	{
		if (region.length)
		{
			static if (is(typeof(localizable) == bool) || localizable == Localizable.replaceDeDe)
			{
				return requestBK!APIResult(URL(endpoint.replace("/de/de/", region)), ttl);
			}
			else static if (localizable == Localizable.acceptLanguageHeader)
			{
				return requestBK!APIResult(URL(endpoint), ttl, ["Accept-Language": region.regionGetLanguage]);
			}
			else static assert (false, "unsupported localizable argument");
		}
		else
			return requestBK!APIResult(URL(endpoint), ttl);
	}

	void updateItems()
	{
		static if ((is(typeof(localizable) == bool) && localizable) || localizable != Localizable.no)
		{
			foreach (region; bkRegions)
				updateItems(region);
		}
		else
		{
			updateItems(null);
		}
	}

	void updateItems(string region)
	{
		import vibe.data.bson;
		import vibe.data.json;
		import vibe.core.log : logInfo;
		import std.datetime : Clock, UTC;

		region = region.normalizeRegion;

		long now = Clock.currTime(UTC()).toUnixTime!long();

		logInfo("Updating " ~ T.stringof ~ " items for region %s", region);
		auto apires = getBKAPI(region);
		static if (is(typeof(APIResult.init.flatten)))
			auto items = apires.flatten();
		else
			auto items = apires;
		static if (is(typeof(T.init.convert)))
		{
			alias Dst = typeof(T.init.convert());
			items = items.map!(a => deserializeJson!T(a).convert.serializeToJson).array;
		}
		else
		{
			alias Dst = T;
		}

		auto ids = items.map!(a => Bson(a["id"].get!int)).array;
		auto query = ["id" : Bson(["$nin": Bson(ids)]), "_active" : Bson(true)];
		if (region.length)
			query["_region"] = Bson(region[1 .. $ - 1]);
		Dst.collection.update(query, [
				"$set": ["_active": Bson(false), "_order": Bson(1000)],
				], UpdateFlags.multiUpdate);
		foreach (i, item; items)
		{
			item["_order"] = Json(cast(int) i);
			item["_apiVer"] = Json(cast(int) apiVersion);
			item["_subApiVer"] = Json(cast(int) subApiVersion);
			bool active = true;

			if (auto to = "to" in item)
				if (to.type == Json.Type.int_)
					active = active && now < to.get!long;

			if (auto from = "from" in item)
				if (from.type == Json.Type.int_)
					active = active && now > from.get!long;

			item["_active"] = Json(active);
			if (region.length)
				item["_region"] = Json(region[1 .. $ - 1]);
			Dst.collection.update(["id": item["id"], "_region": item["_region"]], item, UpdateFlags.upsert);
		}
		logInfo("Upserted %s items for region %s", items.length, region);
	}
}
