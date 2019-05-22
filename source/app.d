import vibe.vibe;

import api.common;
import api.public_.impl;
import api.v3.tiles;
import api.v4.coupons;

void main()
{
	auto settings = new HTTPServerSettings;
	settings.port = 3000;
	settings.bindAddresses = ["::1", "0.0.0.0"];

	auto db = connectMongoDB("mongodb://127.0.0.1").getDatabase("wurgerking");
	Coupon.collection = db["coupons"];

	auto router = new URLRouter;

	router.registerRestInterface(new PublicAPIImpl(), "/api");

	router.get("/", &index);
	HTTPFileServerSettings cacheSettings = new HTTPFileServerSettings("/cache");
	cacheSettings.maxAge = 365.days;
	router.get("/cache/*", serveStaticFiles("public/cache", cacheSettings));
	router.get("*", serveStaticFiles("public"));
	listenHTTP(settings, router);

	runTask({
		logInfo("Pre-caching tiles");
		foreach (tile; getBKTiles())
			tile.cacheTile();
		updateCoupons();
	});

	setTimer(80.minutes, { updateCoupons(); }, true);

	runApplication();
}

void index(HTTPServerRequest req, HTTPServerResponse res)
{
	string username = "Jan";
	auto tiles = getBKTiles().byRows;
	res.render!("home.dt", username, tiles);
}
