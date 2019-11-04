module api.v3.tiles;

import api.common;

import core.time;

import vibe.inet.url;
import vibe.data.serialization;
import vibe.data.json;

import std.algorithm;
import std.range;
import std.typecons;

struct Tile
{
	struct PromoData
	{
		struct Promo
		{
		@optional:
			Images images;
			long promoId;
		}

	@optional:
		Promo[] promos;
		bool galleryAutomatic;
		double duration = 4;
		Images fallbackImages;
	}

@optional:
	mixin TileCommons;

	string type;
	Json data;
}

Tile[] getBKTiles(string region)
{
	auto ret = requestBK!(Tile[])(
			URL("https://api.burgerking.de/api/" ~ token ~ "/v3" ~ region ~ "tiles/"), 6.hours);
	foreach (ref item; ret)
		if (item.type == "menuPromo")
		{
			auto data = item.data.deserializeJson!(Tile.PromoData);
			foreach (ref promo; data.promos)
				proxyImages(promo.images);
			item.data = serializeToJson(data);
		}
	return ret;
}

void cacheTile(Tile tile)
{
	cacheImages(tile.images);
	if (tile.type == "menuPromo")
	{
		auto data = tile.data.deserializeJson!(Tile.PromoData);
		foreach (promo; data.promos)
			cacheImages(promo.images);
		cacheImages(data.fallbackImages);
	}
}
