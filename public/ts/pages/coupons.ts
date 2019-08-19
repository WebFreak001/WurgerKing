///<reference path="pages.ts" />
///<reference path="../commons.ts" />

interface Pages {
	openCoupons(tile?: Tile): void;
	onClickCoupon(this: HTMLElement, event: MouseEvent): void;
	updateCoupons(
		div: HTMLDivElement,
		settings: HTMLElement,
		updateFilters: Function,
		filterCategories: number[],
		onlyActive?: boolean,
		filterLikes?: boolean,
		mybk?: boolean
	): Promise<{
		items: Coupon[],
		count: number,
		categories: number[]
	}>;
}

declare var QRious: any;

Pages.prototype.openCoupons = function (tile?: Tile) {
	let subtitle = new Image();
	subtitle.src = "/img/subtitle_coupons_" + translations.asset_language + ".png";

	let showInactive = false;
	let filterLikes = false;
	let mybk = false;
	let filterCategories: number[] = [];
	let filterBtn: HTMLElement | undefined = undefined;

	let backdrop = document.createElement("div");
	backdrop.className = "filter-backdrop";
	backdrop.style.display = "none";

	let settings = document.createElement("div");
	settings.className = "filter-settings";
	settings.style.display = "none";
	settings.classList.add("hidden");

	let header = document.createElement("div");
	header.className = "header";
	let title = document.createElement("h4");
	title.textContent = translations.filter_title;
	header.appendChild(title);

	let resetButton = document.createElement("div");
	resetButton.className = "reset";
	resetButton.textContent = translations.reset_filter;
	header.appendChild(resetButton);

	let filler = document.createElement("div");
	filler.className = "filler";
	header.appendChild(filler);

	let applyButton = document.createElement("div");
	applyButton.className = "apply";
	applyButton.textContent = translations.apply_filter;
	header.appendChild(applyButton);

	settings.appendChild(header);

	let itemsContainer = document.createElement("div");
	itemsContainer.className = "items";
	settings.appendChild(itemsContainer);

	let items = document.createElement("div");
	items.className = "filters";
	itemsContainer.appendChild(items);

	function refreshItems() {
		pages.updateCoupons(div, items, refreshItems, filterCategories, !showInactive, filterLikes, mybk).then(function (data) {
			if (!filterBtn)
				return;

			let badge = filterBtn.querySelector(".badge");
			if (!badge) {
				badge = document.createElement("div");
				badge.className = "badge";
				filterBtn.appendChild(badge);
			}
			badge.textContent = data.count.toString();
		});
		let changed = showInactive || filterCategories.length > 0;
		if (filterBtn && filterBtn.children[0].tagName == "IMG")
			(<HTMLImageElement>filterBtn.children[0]).src = changed ? "/img/icons/filter_filled.svg" : "/img/icons/filter.svg";
		else if (filterBtn)
			console.error("Expected ", filterBtn.children[0], " to be an image");
		resetButton.style.display = changed ? "" : "none";
	}

	function openFilters() {
		backdrop.style.display = "block";
		settings.style.display = "block";
		settings.classList.add("hidden");
		setTimeout(function () {
			settings.classList.remove("hidden");
		}, 30);
	}

	function closeFilters() {
		backdrop.style.display = "none";
		settings.classList.add("hidden");
		setTimeout(function () {
			settings.style.display = "none";
		}, 100);
	}

	function toggleFilters() {
		if (backdrop.style.display == "none") {
			openFilters();
		} else {
			closeFilters();
		}
	}

	resetButton.onclick = function () {
		showInactive = false;
		filterCategories.splice(0, filterCategories.length);
		refreshItems();
		closeFilters();
	};

	applyButton.onclick = closeFilters;

	let inactiveToggle = createFilterItem(undefined, translations.ex_filter_inactive, showInactive, function (active) {
		showInactive = active;
		refreshItems();
	});
	itemsContainer.appendChild(inactiveToggle);

	let div = this.openTitledGeneric("coupons", tile, translations.page_coupons, true, undefined, function () {
		let title = div.parentElement!.querySelectorOrThrow(".title", true);
		let img = document.createElement("img");
		img.classList.add("subtitle");
		img.style.marginBottom = "-" + parseFloat(translations.subtitle_offset || "0") * 0.3 + "px";
		img.src = subtitle.src;
		title.appendChild(img);

		div.parentElement!.appendChild(backdrop);
		div.parentElement!.appendChild(settings);
	}, [
			{
				icon: "/img/icons/mybk.svg",
				callback: function (e) {
					mybk = !mybk;
					if (this.children[0].tagName == "IMG")
						(<HTMLImageElement>this.children[0]).src = mybk ? "/img/icons/mybk_filled.svg" : "/img/icons/mybk.svg";
					else console.error("Expected ", this.children[0], " to be an image!");
					refreshItems();
				}
			},
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
			},
			{
				icon: "/img/icons/filter.svg",
				onCreate: function (elem) {
					filterBtn = elem;
				},
				callback: function () {
					filterBtn = this;
					toggleFilters();
				}
			}
		]);

	div.classList.add("grid");
	refreshItems();
};

Pages.prototype.onClickCoupon = function (this: HTMLElement, event: MouseEvent) {
	const dataStr = this.parentElement ? this.parentElement.getAttribute("data") : undefined;
	if (!dataStr)
		return;
	let data: Coupon = JSON.parse(dataStr);
	console.log(data);
	let div = pages.openBlankGeneric("coupons/" + data.id, this.parentElement!, true, function () {
		let container = document.createElement("div");
		container.className = "content";
		div.appendChild(container);

		let tile = document.createElement("div");
		tile.className = "bigtile";
		let content = renderCouponTile(tile, data);
		content.classList.add("bigbranded");
		container.appendChild(tile);

		let qr = document.createElement("div");
		qr.className = "qrcode";
		qr.style.display = "none";
		qr.style.opacity = "0";

		let flag = document.createElement("div");
		flag.className = "flag flag-" + region.substr(0, 2);
		qr.appendChild(flag);

		let topLabel = document.createElement("p");
		topLabel.className = "toplabel";
		topLabel.textContent = translations.coupon_top_title;
		qr.appendChild(topLabel);

		let code = document.createElement("div");
		code.className = "code";

		let canvas = document.createElement("canvas");
		let context: CanvasRenderingContext2D | null;
		code.appendChild(canvas);
		let startFrame: number, endFrame: number;
		let modeIndex = 0;
		let barcode: CouponBarcode;
		let bitmap: HTMLCanvasElement;
		let bits: number[] = [];
		let dpr = window.devicePixelRatio || 1;
		let canvasWidth: number, canvasHeight: number;
		let lastFrame = performance.now();

		for (let i = data.barcodes.length - 1; i >= 0; i--) {
			console.log(data.barcodes[i]);
			if (!data.barcodes[i].value)
				data.barcodes.splice(i, 1);
			else if (data.barcodes[i].type == "QR")
				modeIndex = i;
		}

		if (data.myBkOnetime || !data.barcodes.length)
			data.barcodes.push({
				"type": "label",
				"value": data.plu
			});

		function reinitCanvas() {
			var rect = qr.getBoundingClientRect();
			var self = code.getBoundingClientRect();
			canvas.style.width = "100%";
			canvasWidth = rect.width;
			canvasHeight = rect.height - (self.top - rect.top) * 2 - 40; // top = bottom space - label height
			canvas.width = canvasWidth * dpr;
			canvas.height = canvasHeight * dpr;
			startFrame = 0;
			endFrame = 0.15;

			barcode = data.barcodes[modeIndex];

			context = canvas.getContext("2d")!;
			if (context == null) {
				throw new Error("Canvas API not supported");
			}
			context.imageSmoothingEnabled = false;
			(<any>context).mozImageSmoothingEnabled = false;
			(<any>context).webkitImageSmoothingEnabled = false;

			var mode = barcode.type;

			if (mode == "QR") {
				bitmap = document.createElement("canvas");
				bitmap.width = bitmap.height = 21 * 16;
				new QRious({
					element: bitmap,
					value: barcode.value,
					size: bitmap.width,
					backgroundAlpha: 0,
					foreground: "#682f1c",
					level: "L" // L, M, Q, H
				});
			} else if (mode == "EAN-13") {
				var v = barcode.value;
				if (v.length == 13) {
					bits = [];
					bits.push(1, 0, 1);
					var pattern = [
						"LLLLLL",
						"LLGLGG",
						"LLGGLG",
						"LLGGGL",
						"LGLLGG",
						"LGGLLG",
						"LGGGLL",
						"LGLGLG",
						"LGLGGL",
						"LGGLGL"
					][parseInt(v[0])];

					var codes: { [index: string]: number[][] } = {
						L: [
							[0, 0, 0, 1, 1, 0, 1],
							[0, 0, 1, 1, 0, 0, 1],
							[0, 0, 1, 0, 0, 1, 1],
							[0, 1, 1, 1, 1, 0, 1],
							[0, 1, 0, 0, 0, 1, 1],
							[0, 1, 1, 0, 0, 0, 1],
							[0, 1, 0, 1, 1, 1, 1],
							[0, 1, 1, 1, 0, 1, 1],
							[0, 1, 1, 0, 1, 1, 1],
							[0, 0, 0, 1, 0, 1, 1]
						],
						G: [
							[0, 1, 0, 0, 1, 1, 1],
							[0, 1, 1, 0, 0, 1, 1],
							[0, 0, 1, 1, 0, 1, 1],
							[0, 1, 0, 0, 0, 0, 1],
							[0, 0, 1, 1, 1, 0, 1],
							[0, 1, 1, 1, 0, 0, 1],
							[0, 0, 0, 0, 1, 0, 1],
							[0, 0, 1, 0, 0, 0, 1],
							[0, 0, 0, 1, 0, 0, 1],
							[0, 0, 1, 0, 1, 1, 1]
						],
						R: [
							[1, 1, 1, 0, 0, 1, 0],
							[1, 1, 0, 0, 1, 1, 0],
							[1, 1, 0, 1, 1, 0, 0],
							[1, 0, 0, 0, 0, 1, 0],
							[1, 0, 1, 1, 1, 0, 0],
							[1, 0, 0, 1, 1, 1, 0],
							[1, 0, 1, 0, 0, 0, 0],
							[1, 0, 0, 0, 1, 0, 0],
							[1, 0, 0, 1, 0, 0, 0],
							[1, 1, 1, 0, 1, 0, 0]
						]
					};

					for (var i = 1; i < 7; i++) {
						var c = codes[pattern[i - 1]][parseInt(v[i])];
						bits.push.apply(bits, c);
					}
					bits.push(0, 1, 0, 1, 0);
					for (var i = 7; i < 13; i++) {
						var c = codes.R[parseInt(v[i])];
						bits.push.apply(bits, c);
					}
					bits.push(1, 0, 1);
				}

				var step = Math.floor(1 / bits.length * canvas.width) / dpr;
				bitmap = document.createElement("canvas");
				bitmap.width = step * bits.length + 1;
				bitmap.height = 9 * canvasWidth / 50;
				var c2 = bitmap.getContext("2d");
				if (c2 == null)
					throw new Error("Canvas API not supported");

				c2.beginPath();
				c2.fillStyle = "#682f1c";
				c2.translate(0.5, -0.5);
				for (var x = 0; x < bits.length; x++) {
					if (bits[x] != 0)
						c2.rect(x * step, 0, step, bitmap.height);
					c2.fill();
				}
				c2.translate(0.5, 0.5);
			}

			lastFrame = performance.now();
		}

		function redraw() {
			if (!context)
				return;

			let now = performance.now();
			let delta = (now - lastFrame) / 16.0;
			lastFrame = now;

			let mode = barcode.type;

			function animatedRect(w: number, h: number) {
				if (!context)
					return;

				let speed = w / 3000 * delta;

				if (startFrame <= 0.25 || (startFrame > 0.5 && startFrame <= 0.75))
					startFrame += speed * h / w;
				else
					startFrame += speed;
				startFrame = startFrame % 1;

				if (endFrame <= 0.25 || (endFrame > 0.5 && endFrame <= 0.75))
					endFrame += speed * h / w;
				else
					endFrame += speed;
				endFrame = endFrame % 1;

				let start = startFrame;
				let end = endFrame;
				if (end < start)
					end++;

				let corners = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

				function mapPoint(time: number): [number, number] {
					while (time < 0)
						time++;
					time = time % 1;
					if (time <= 0.25)
						return [time * 4 * (w - 1) * s + 0.5 * s, 0.5 * s];
					else if (time <= 0.5)
						return [w * s - 0.5 * s, (time - 0.25) * 4 * (h - 1) * s + 0.5 * s];
					else if (time <= 0.75)
						return [(0.75 - time) * 4 * (w - 1) * s + 0.5 * s, h * s - 0.5 * s];
					else
						return [0.5 * s, (1 - time) * 4 * (h - 1) * s + 0.5 * s];
				}

				context.strokeStyle = "#69a82f";
				context.lineWidth = s;
				context.beginPath();
				let overCorners = [];
				for (let i = 0; i < corners.length; i++) {
					if (start < corners[i] && end >= corners[i]) {
						overCorners.push(corners[i]);
					}
				}
				if (overCorners.length) {
					let startPoint = mapPoint(start);
					let endPoint = mapPoint(end);
					context.moveTo(startPoint[0], startPoint[1]);
					for (let i = 0; i < overCorners.length; i++) {
						let overCorner = mapPoint(overCorners[i]);
						context.lineTo(overCorner[0], overCorner[1]);
					}
					context.lineTo(endPoint[0], endPoint[1]);
				} else {
					let startPoint = mapPoint(start);
					let endPoint = mapPoint(end);
					context.moveTo(startPoint[0], startPoint[1]);
					context.lineTo(endPoint[0], endPoint[1]);
				}
				context.stroke();
				context.closePath();

				let ds = mode == "QR" ? 5 : 6;
				let de = mode == "QR" ? 12 : 14;

				let grad = context.createRadialGradient(0, 0, ds * s, 0, 0, de * s);
				context.beginPath();
				grad.addColorStop(0, "#fcf6f0ff");
				grad.addColorStop(1, "#fcf6f000");
				context.fillStyle = grad;
				context.fillRect(-s, -s, (de + 1) * s, (de + 1) * s);
				context.closePath();

				grad = context.createRadialGradient(w * s, h * s, ds * s, w * s, h * s, de * s);
				context.beginPath();
				grad.addColorStop(0, "#fcf6f0ff");
				grad.addColorStop(1, "#fcf6f000");
				context.fillStyle = grad;
				context.fillRect((w - de) * s, (h - de) * s, (de + 1) * s, (de + 1) * s);
				context.closePath();
			}

			context.clearRect(-100, -100, canvasWidth + 200, canvasHeight + 200);

			let s = mode == "QR" ? canvasHeight / 30 : canvasWidth / 50;
			context.resetTransform();
			context.scale(dpr, dpr);

			let w = mode == "QR" ? 30 : 40;
			let h = mode == "QR" ? 30 : 13;

			if (mode == "QR") {
				context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
				animatedRect(w, h);

				context.drawImage(bitmap, 3 * s, 3 * s, 24 * s, 24 * s);
			} else if (mode == "EAN-13") {
				let step = Math.floor(1 / bits.length * canvas.width) / dpr;

				w = (6 + step * bits.length / s);
				context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
				animatedRect(w, h);

				context.drawImage(bitmap, 3 * s, 2 * s - 1);
			} else {
				context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
				animatedRect(w, h);

				context.font = (h * (s - 4)) + "px 'Passion One', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillStyle = "#682f1c";
				context.fillText(barcode.value, w * s / 2, h * s / 2);
				context.fill();
			}

			if (requestAnimationFrame)
				requestAnimationFrame(redraw);
			else
				setTimeout(redraw, 16);
		}

		let codeLabel = document.createElement("div");
		codeLabel.textContent = data.plu;
		codeLabel.className = "label";
		if (data.myBkOnetime) {
			// TODO: countdown timer
		}
		else if (data.barcodes.length > 1)
			code.appendChild(codeLabel);

		qr.appendChild(code);

		let bottomLabel = document.createElement("p");
		bottomLabel.className = "bottomlabel";

		if (data.barcodes.length == 2
			&& (data.barcodes[0].type == "QR" && data.barcodes[1].type == "EAN-13"
				|| data.barcodes[0].type == "EAN-13" && data.barcodes[1].type == "QR")) {
			bottomLabel.textContent = data.barcodes[modeIndex].type == "QR" ? translations.switch_to_ean : translations.switch_to_qr;
		} else {
			bottomLabel.textContent = translations.switch_to_next;
		}

		console.log(data.barcodes);
		if (data.barcodes.length > 1)
			qr.appendChild(bottomLabel);
		bottomLabel.addEventListener("click", function () {
			modeIndex = (modeIndex + 1) % data.barcodes.length;
			if (data.barcodes.length == 2
				&& (data.barcodes[0].type == "QR" && data.barcodes[1].type == "EAN-13"
					|| data.barcodes[0].type == "EAN-13" && data.barcodes[1].type == "QR")) {
				bottomLabel.textContent = data.barcodes[modeIndex].type == "QR" ? translations.switch_to_ean : translations.switch_to_qr;
			} else {
				bottomLabel.textContent = translations.switch_to_next;
			}
			reinitCanvas();
		});

		tile.appendChild(qr);

		let redeem = document.createElement("div");
		redeem.className = "redeembtn";
		redeem.textContent = translations.redeembtn;
		div.appendChild(redeem);

		redeem.addEventListener("click", function () {
			if (qr.style.display == "none") {
				qr.style.display = "";
				if (context)
					context.clearRect(0, 0, canvasWidth, canvasHeight);
				context = null;
				setTimeout(function () {
					qr.style.opacity = "1";
					setTimeout(function () {
						reinitCanvas();
						redraw();
					}, 300);
				}, 50);
				redeem.textContent = translations.redeembtn;
			} else {
				qr.style.opacity = "0";
				qr.style.display = "none";
				if (context)
					context.clearRect(0, 0, canvasWidth, canvasHeight);
				context = null;
				redeem.textContent = translations.redeembtn_close;
			}
		});

		let infos = document.createElement("div");
		infos.className = "highlit-panel coupon-panel";

		let name = document.createElement("h3");
		name.textContent = data.title.replace(/®/g, ""); // the ® sign looks too weird, so we strip it out from the big title
		infos.appendChild(name);

		if (typeof data.description == "string" && data.description.length > 0) {
			let desc = document.createElement("p");
			desc.className = "description";
			desc.textContent = data.description;
			infos.appendChild(desc);
		}

		let price = document.createElement("p");
		price.className = "price";
		price.textContent = data.price;
		infos.appendChild(price);

		let extra = document.createElement("h4");
		extra.textContent = translations.coupon_restaurants;
		infos.appendChild(extra);

		container.appendChild(infos);

		let maps = document.createElement("img");
		maps.className = "fullmaps";
		maps.src = "/img/generic_maps.png";
		container.appendChild(maps);

		let details = document.createElement("div");
		details.className = "details htmlview";
		try {
			insertHTMLInto(data.footnote, details);
		}
		catch (e) {
			console.error("Error in footnote: ", data.footnote, e);
		}
		container.appendChild(details);
	}, [
			{
				icon: "/img/icons/share.svg",
				callback: function () {
					if (navigator.share) {
						navigator.share({
							text: translate(translations.share, data.title, data.price),
							url: "burgerking://coupons/" + data.id
						})
					}
				}
			}
		])
}

Pages.prototype.updateCoupons = async function (div, settings, updateFilters, filterCategories, onlyActive, filterLikes, mybk) {
	while (div.lastChild)
		div.removeChild(div.lastChild);

	let categories = meta.getProductCategories();

	let couponClickHandler = this.onClickCoupon;
	const rows = await api.getCoupons(undefined, onlyActive, undefined, undefined, filterLikes ? likes.getIds() : undefined, mybk);
	let flattend: Coupon[] = [];
	let count = 0;
	let usedCategories: number[] = [];
	let unfullRows: HTMLElement[] = [];

	rows.forEach(row => {
		let tr = document.createElement("div");
		tr.className = "row";
		div.appendChild(tr);
		for (let j = 0; j < row.length; j++) {
			let cell = row[j];
			let td = document.createElement("div");
			td.className = "tile";
			if (cell._active === false && cell.to) {
				td.classList.add("inactive");
				let expires = new Date(cell.to * 1000);
				let now = new Date();
				let diff = now.getTime() - expires.getTime();
				if (diff > 30 * 24 * 60 * 60 * 1000)
					td.classList.add("old");
			}
			let content = renderCouponTile(td, cell);
			content.addEventListener("click", couponClickHandler);
			if (autoNavigate) {
				autoNavigate = false;
				setTimeout(function () {
					content.click();
				}, 400);
			}
			flattend.push(cell);

			let anyUsed = false;
			if (Array.isArray(cell.categories))
				for (let k = 0; k < cell.categories.length; k++) {
					if (usedCategories.indexOf(cell.categories[k]) == -1)
						usedCategories.push(cell.categories[k]);

					if (filterCategories.indexOf(cell.categories[k]) != -1)
						anyUsed = true;
				}

			if (!anyUsed && filterCategories.length > 0)
				unfullRows.push(tr);
			else {
				tr.appendChild(td);
				count++;
			}
		}
	});

	function computeRowWidth(row: HTMLElement) {
		let total = 0;
		for (let i = 0; i < row.children.length; i++) {
			let w = row.children[i].getAttribute("width");
			if (w !== null)
				total += parseInt(w);
		}
		return total;
	}

	while (unfullRows.length > 0) {
		let first = unfullRows[0];
		let len = computeRowWidth(first);
		for (let i = 1; i < unfullRows.length; i++) {
			let other = computeRowWidth(unfullRows[i]);
			if (len + other <= 4) {
				len += other;
				for (let j = 0; j < unfullRows[i].children.length; j++)
					first.appendChild(unfullRows[i].children[j]);
				try { div.removeChild(unfullRows[i]); } catch (e) { }
				unfullRows.splice(i, 1);
				if (len == 4)
					break;
				else
					continue;
			}
		}
		unfullRows.splice(0, 1);
	}

	const data = <(ItemCommons & { icon: Image })[]>await categories;
	for (let i = data.length - 1; i >= 0; i--)
		if (usedCategories.indexOf(data[i].id) == -1)
			data.splice(i, 1);

	data.sort(function (a, b) {
		return a.id - b.id;
	});

	while (settings.lastChild)
		settings.removeChild(settings.lastChild);

	for (let i = 0; i < data.length; i++) {
		let item = createFilterItem(data[i].icon.url, data[i].title, filterCategories.indexOf(data[i].id) != -1,
			function (active) {
				let id = parseInt(this.getAttribute("data-id") || "0");

				let index = filterCategories.indexOf(id);
				while (index != -1) {
					filterCategories.splice(index, 1);
					index = filterCategories.indexOf(id);
				}
				if (active)
					filterCategories.push(id);

				updateFilters();
			});
		item.setAttribute("data-id", data[i].id.toString());
		// app doesn't color the text, idk what it does with the color
		// item.style.color = "#" + data[i].color.substr(0, 6);
		settings.appendChild(item);
	}

	return {
		items: flattend,
		count: count,
		categories: usedCategories
	};
};

function insertImages(div: HTMLElement, images: Images, attr: string = "src") {
	if (images.bgImage) {
		const img1 = document.createElement("img");
		img1.setAttribute(attr, images.bgImage.url);
		div.appendChild(img1);
	}

	if (images.fgImage) {
		const img2 = document.createElement("img");
		img2.setAttribute(attr, images.fgImage.url);
		div.appendChild(img2);
	}
}

function renderCouponTile(div: HTMLElement, tile: Coupon) {
	if (tile.images.bgColor && tile.images.bgColor.length == 6)
		div.style.backgroundColor = "#" + tile.images.bgColor;
	div.setAttribute("width", tile.dimension.width.toString());
	div.setAttribute("height", tile.dimension.height.toString());
	div.setAttribute("data", JSON.stringify(tile));

	const content = document.createElement("div");
	content.className = "content wonky";
	insertImages(content, tile.images);
	div.appendChild(content);

	const like = document.createElement("img");
	like.className = "like";
	like.src = likes.check(tile.id) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
	like.addEventListener("click", function () {
		this.src = likes.toggle(tile.id) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
	});
	div.appendChild(like);

	return content;
}
