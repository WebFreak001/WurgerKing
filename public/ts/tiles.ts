///<reference path="commons.ts" />

var ignoredPromos = [
	11087 // multi language update
];

type Tile = HTMLElement;

function clickTile(tile: Tile) {
	var type = tile.getAttribute("data-type");
	console.log("click " + type)
	switch (type) {
		case "menuPromo":
			break;
		case "menuCoupon":
			pages.openCoupons(tile);
			break;
		case "menuDelivery":
			pages.openDelivery(tile);
			break;
		case "menuKingfinder":
			pages.openKingfinder(tile);
			break;
		case "menuProduct":
			pages.openProducts(tile);
			break;
		case "menuMybk":
			pages.openMybk(tile);
			break;
		case "menuGeneric":
			pages.openGeneric(tile);
			break;
		case "_wurgerking_store_coupons":
			pages.openStoreCoupons(tile);
			break;
		default:
			console.error("Unrecognized tile link type: " + type);
			return;
	}
}

var tiles = document.querySelectorAll(".tile");
for (var i = 0; i < tiles.length; i++)
	tiles[i].addEventListener("click", function (this: HTMLElement) {
		clickTile(this);
	});
