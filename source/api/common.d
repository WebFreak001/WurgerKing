module api.common;

public import api.cache;

import vibe.data.serialization;

import core.time;

import std.algorithm;
import std.array;
import std.range;
import std.typecons;

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
		proxyImage(images.bgImage.url);
	if (!images.fgImage.isNull)
		proxyImage(images.fgImage.url);
}

void proxyImages(ref Images images) @safe
{
	if (!images.bgImage.isNull)
		images.bgImage.url = proxyImage(images.bgImage.url);
	if (!images.fgImage.isNull)
		images.fgImage.url = proxyImage(images.fgImage.url);
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
		Tile[4] row;
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
			int sum = row[0].dimension.width;
			while (sum < 4 && rowLength < 4 && !tiles.empty)
			{
				if (sum + tiles.front.dimension.width > 4)
					break;
				row[rowLength++] = tiles.front;
				tiles.popFront;
				sum += row[rowLength - 1].dimension.width;
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

mixin template GenericCachable(T, int apiVersion, int subApiVersion, string endpoint, Duration ttl)
{
	enum bkApiVersion = apiVersion;
	enum bkSubApiVersion = subApiVersion;

	Json[] getBKAPI()
	{
		return requestBK!(Json[])(URL(endpoint), ttl);
	}

	void updateItems()
	{
		import vibe.data.bson : Bson;
		import vibe.data.json : Json;

		auto items = getBKAPI();
		auto ids = items.map!(a => Bson(a["id"].get!int)).array;
		T.collection.update(["id": Bson(["$nin": Bson(ids)]),
				"_active": Bson(true)], [
				"$set": ["_active": Bson(false), "_order": Bson(1000)],
				], UpdateFlags.multiUpdate);
		foreach (i, item; items)
		{
			item["_order"] = Json(cast(int) i);
			item["_apiVer"] = Json(cast(int) apiVersion);
			item["_subApiVer"] = Json(cast(int) subApiVersion);
			item["_active"] = Json(true);
			T.collection.update(["id": cast(long) item["id"].get!int], item, UpdateFlags.upsert);
		}
	}
}
