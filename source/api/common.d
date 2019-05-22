module api.common;

public import api.cache;

import vibe.data.serialization;

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

mixin template TileCommons()
{
	import std.typecons : Nullable;

	Dimension dimension;
	int id;
	long modified;
	string title;
	Images images;
	Nullable!long from;
	Nullable!long to;
}

struct Dimension
{
	int width = 2, height = 2;
}

void cacheImages(Images images)
{
	if (!images.bgImage.isNull)
		proxyImage(images.bgImage.url);
	if (!images.fgImage.isNull)
		proxyImage(images.fgImage.url);
}

enum isTilable(T) = __traits(hasMember, T.init, "dimension")
	&& is(typeof(__traits(getMember, T.init, "dimension")) : Dimension);

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
}
