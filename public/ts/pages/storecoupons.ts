///<reference path="pages.ts" />
///<reference path="../commons.ts" />

interface Pages {
	openStoreCoupons(tile?: Tile): void;
	updatePaperCoupons(div: HTMLElement, storeCoupons: StoreCouponList, onlyLikes: boolean): void;
}

const numTotalStores = 50;

declare var QRious: any;

var storeCouponsFetchDate = new Date();
var storeCoupons: StoreCouponList | null = null;
Pages.prototype.openStoreCoupons = function (tile?: Tile) {
	let subtitle = new Image();
	subtitle.src = "/img/subtitle_coupons_" + translations.asset_language + ".png";

	let filterLikes = false;

	async function refreshItems() {
		if (!storeCoupons || new Date().getTime() - storeCouponsFetchDate.getTime() > 60 * 60 * 1000)
			storeCoupons = await api.getStoreCoupons();
		pages.updatePaperCoupons(div, storeCoupons, filterLikes);
	}

	let div = this.openTitledGeneric("paper-coupons", tile, translations.etc_coupons, true, undefined, function (title) {
		let img = document.createElement("img");
		img.classList.add("subtitle");
		img.src = subtitle.src;
		title.appendChild(img);
	}, [
		{
			icon: "/img/icons/heart.svg",
			callback: function (e) {
				filterLikes = !filterLikes;
				if (this.children[0].tagName == "IMG")
					(<HTMLImageElement>this.children[0]).src = filterLikes ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
				else console.error("Expected ", this.children[0], " to be an image!");
				refreshItems();
			}
		},
		{
			icon: "/img/icons/search.svg",
			callback: function (e) {
			}
		}
	]);

	div.classList.add("paperlist");
	refreshItems();
};

Pages.prototype.updatePaperCoupons = function (div: HTMLElement, storeCoupons: StoreCouponList, onlyLikes: boolean) {
	while (div.lastChild)
		div.removeChild(div.lastChild);

	let backdrop = document.createElement("div");
	backdrop.className = "backdrop";
	backdrop.style.display = "none";
	div.appendChild(backdrop);

	function renderStoreCoupon(coupon: StoreCoupon) {
		let likeId = "pp" + coupon.promoCode;
		if (onlyLikes && !likes.check(likeId))
			return;

		let paper = document.createElement("div");
		paper.className = "papercoupon";

		function make(elem: string, name: string, textContent: any) {
			let item = document.createElement(elem);
			item.className = name;
			function addChild(c: any) {
				if (typeof c == "object" && c instanceof HTMLElement)
					item.appendChild(c);
				else
					item.appendChild(document.createTextNode(c.toString()));
			}
			if (Array.isArray(textContent))
				textContent.forEach(addChild);
			else
				addChild(textContent);

			paper.appendChild(item);
			return item;
		}

		function add(elem: string, name: string, textContent: any) {
			let item = make.apply(null, <any>arguments);
			paper.appendChild(item);
			return item;
		}

		function formatPrice(d: number) {
			return (d / 100).toFixed(2).replace('.', ',') + " €";
		}

		(<HTMLImageElement>add("img", "image", [])).src = coupon.product.image_url;

		add("span", "humancode", coupon.humanCode);
		add("span", "plu", coupon.promoCode);
		var plus = coupon.name.indexOf('+');
		if (plus == -1)
			add("span", "name", coupon.name);
		else {
			add("span", "firstname", coupon.name.substr(0, plus).trim());
			add("span", "subname", coupon.name.substr(plus).trim());
		}
		let minPrice = coupon.prices.reduce((a, b) => Math.min(a, b));
		let maxPrice = coupon.prices.reduce((a, b) => Math.max(a, b));
		if (minPrice == maxPrice)
			add("span", "fixed-price" + (minPrice >= 1000 ? " two-digit" : ""), [
				make("span", "euro", Math.floor(minPrice / 100)),
				make("span", "cents", minPrice % 100),
				make("span", "eurosign", "\u20ac"),
			]);
		else
			add("span", "variable-price hide_in_fullscreen", formatPrice(minPrice) + " ­\u002d " + formatPrice(maxPrice));

		let plu_qr = (<HTMLCanvasElement>add("canvas", "plu-qr", []));
		plu_qr.width = plu_qr.height = 21 * 12;
		new QRious({
			element: plu_qr,
			value: coupon.promoCode,
			size: plu_qr.width,
			backgroundAlpha: 0,
			foreground: "black",
			level: "L" // L, M, Q, H
		});

		if (coupon.stores.length < numTotalStores)
			add("span", "store-support hide_in_fullscreen", coupon.stores.length + " / " + numTotalStores + " stores");

		const like = document.createElement("img");
		like.className = "like hide_in_fullscreen no_click";
		like.src = likes.check(likeId) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
		like.addEventListener("click", function () {
			this.src = likes.toggle(likeId) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
		});
		paper.appendChild(like);

		paper.addEventListener("click", function (e) {
			let t = <HTMLElement>e.target;
			while (t && t != paper) {
				if (t.classList.contains("no_click"))
					return;
				t = <HTMLElement>t.parentElement;
			}

			paper.classList.add("fullscreen");
			backdrop.style.display = "";
			backdrop.onclick = function() {
				paper.classList.remove("fullscreen");
				backdrop.style.display = "none";
			};
		});

		div.appendChild(paper);
	}

	let pairs: { key: string, value: StoreCoupon[] }[] = [];
	for (let group in storeCoupons) {
		if (storeCoupons.hasOwnProperty(group)) {
			pairs.push({ key: group, value: storeCoupons[group] });
		}
	}

	pairs.sort((a, b) => b.value.length - a.value.length);

	console.log(pairs);
	for (let i = 0; i < pairs.length; i++) {
		let header = document.createElement("h2");
		header.textContent = pairs[i].key;
		div.appendChild(header);

		for (let j = 0; j < pairs[i].value.length; j++) {
			renderStoreCoupon(pairs[i].value[j]);
		}
	}
};
