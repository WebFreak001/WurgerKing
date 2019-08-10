var autoNavigate = false;

function clickTile(tile) {
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
		default:
			console.error("Unrecognized tile link type: " + type);
			return;
	}
}

function getUsername() {
	return window.localStorage.getItem("username") || "Jan";
}

function updateUsernames() {
	var usernames = document.querySelectorAll(".username");
	var name = getUsername();
	for (var i = 0; i < usernames.length; i++) {
		usernames[i].textContent = name;
	}
}

function changeUsername() {
	var newName = prompt("Neuen Namen eingeben:", getUsername());
	if (!newName)
		return;
	window.localStorage.setItem("username", newName);
	updateUsernames();
}

var bottomBar = {
	element: document.querySelector(".bottombar"),
	actionsContainer: null,
	show: function (actions) {
		this.element.classList.remove("hidden");
		while (this.actionsContainer.hasChildNodes())
			this.actionsContainer.removeChild(this.actionsContainer.lastChild);

		if (Array.isArray(actions)) {
			for (var i = 0; i < actions.length; i++) {
				var action = actions[i];
				var elem;
				if (typeof action.icon == "string" && action.icon.endsWith(".svg")) {
					elem = document.createElement("img");
					elem.src = action.icon;

				} else if (typeof action.element == "object") {
					elem = action.element;
				} else {
					console.error("Ignoring unsupported action ", action);
					continue;
				}

				var btn = document.createElement("div");
				btn.className = "action" + (typeof action.icon == "string" ? " icon" : "");
				btn.appendChild(elem);
				if (action.callback)
					btn.addEventListener("click", action.callback);
				if (action.onCreate)
					action.onCreate(btn);
				this.actionsContainer.appendChild(btn);
			}
		}
	},
	hide: function () {
		this.element.classList.add("hidden");
	}
};
bottomBar.actionsContainer = bottomBar.element.querySelector(".right");
bottomBar.element.querySelector(".close").addEventListener("click", function () {
	pages.back();
});

var pages = {
	animation: undefined,
	cancelAnimation: undefined,
	stack: [],
	/**
	 * @param {HTMLElement} tile 
	 * @param {Function?} animationDone 
	 */
	openBlankGeneric: function (name, tile, withBottomBar, animationDone, actions) {
		var div = document.createElement("div");
		this.stack.push({ div: div, withBottomBar: withBottomBar, actions: actions });
		window.history.pushState({ name: name }, "");
		div.className = name + " subpage loading" + (withBottomBar ? " bottomless" : "");
		var rect = tile ? tile.getBoundingClientRect() : { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50, width: 100, height: 100 };
		div.style.left = rect.x + "px";
		div.style.top = rect.y + "px";
		div.style.width = rect.width + "px";
		div.style.height = rect.height + "px";
		document.body.appendChild(div);
		pages.cancelAnimation = function () {
			document.body.removeChild(div);
		};
		pages.animation = setTimeout(function () {
			div.classList.add("animating");
			pages.animation = setTimeout(function () {
				div.classList.remove("animating");
				div.classList.remove("loading");
				div.style.left = "";
				div.style.top = "";
				div.style.width = "";
				div.style.height = "";

				var subPages = document.querySelectorAll(".subpage");
				for (var i = 0; i < subPages.length; i++)
					if (subPages[i] != div)
						subPages[i].style.display = "none";
				document.querySelector(".home").style.display = "none";

				pages.cancelAnimation = undefined;
				if (animationDone) animationDone();
			}, 300);
		}, 10);

		if (withBottomBar)
			bottomBar.show(actions);

		return div;
	},
	openTitledGeneric: function (name, tile, title, withBottomBar, animationDone, titleAnimationDone, actions) {
		var titleDiv = document.createElement("div");
		titleDiv.className = "title branded loading";
		titleDiv.textContent = title;
		var content = document.createElement("div");
		content.className = "content";
		var div = this.openBlankGeneric(name, tile, withBottomBar, function () {
			titleDiv.classList.add("animating");
			pages.animation = setTimeout(function () {
				titleDiv.classList.remove("animating");
				titleDiv.classList.remove("loading");
				if (titleAnimationDone) titleAnimationDone();
			}, 200);
			if (animationDone) animationDone();
		}, actions);
		div.classList.add("titled");
		div.appendChild(titleDiv);
		div.appendChild(content);
		return content;
	},
	back: function (noHistory) {
		clearTimeout(pages.animation);
		if (pages.cancelAnimation) pages.cancelAnimation();
		var page = this.stack.pop();

		if (!noHistory && window.history.state && window.history.state.name == page.name)
			window.history.back();

		if (page) {
			document.body.removeChild(page.div);
		}

		if (this.stack.length == 0) {
			this.home();
		} else {
			var current = this.stack[this.stack.length - 1];
			var subPages = document.querySelectorAll(".subpage");
			for (var i = 0; i < subPages.length; i++)
				subPages[i].style.display = subPages[i] == current.div ? "" : "none";

			if (current.withBottomBar)
				bottomBar.show(current.actions);
		}
	},
	home: function () {
		clearTimeout(pages.animation);
		if (pages.cancelAnimation) pages.cancelAnimation();
		document.querySelector(".home").style.display = "";
		var subPages = document.querySelectorAll(".subpage");
		for (var i = 0; i < subPages.length; i++)
			subPages[i].parentElement.removeChild(subPages[i]);
		bottomBar.hide();
	},
	onLoad: function () {
		var promos = document.querySelector('[data-type="menuPromo"]');
		if (promos) {
			var carousel = document.createElement("div");
			carousel.className = "promolist carousel";
			promos.appendChild(carousel);

			var items = JSON.parse(promos.getAttribute("data-json")).promos;

			for (var i = 0; i < items.length; i++) {
				var promo = document.createElement("div");
				promo.setAttribute("data-json", JSON.stringify(items[i]));
				promo.className = "carousel-cell promo";
				insertImages(promo, items[i].images, "data-flickity-lazyload");
				carousel.appendChild(promo);
			}

			var flkty = new Flickity(carousel, {
				lazyLoad: 1,
				prevNextButtons: false,
				wrapAround: true
			});
			flkty.on("staticClick", pages.onClickPromo);
		}
		updateUsernames();

		document.querySelector(".home > header").addEventListener("dblclick", changeUsername);
	},
	openCoupons: function (tile) {
		var subtitle = new Image();
		subtitle.src = "/img/subtitle_coupons.png";

		var showInactive = false;
		var filterLikes = false;
		var mybk = false;
		var filterCategories = [];
		var filterBtn = undefined;

		var backdrop = document.createElement("div");
		backdrop.className = "filter-backdrop";
		backdrop.style.display = "none";

		var settings = document.createElement("div");
		settings.className = "filter-settings";
		settings.style.display = "none";
		settings.classList.add("hidden");

		var header = document.createElement("div");
		header.className = "header";
		var title = document.createElement("h4");
		title.textContent = "Filter";
		header.appendChild(title);

		var resetButton = document.createElement("div");
		resetButton.className = "reset";
		resetButton.textContent = "zurücksetzen";
		header.appendChild(resetButton);

		var filler = document.createElement("div");
		filler.className = "filler";
		header.appendChild(filler);

		var applyButton = document.createElement("div");
		applyButton.className = "apply";
		applyButton.textContent = "anwenden";
		header.appendChild(applyButton);

		settings.appendChild(header);

		var itemsContainer = document.createElement("div");
		itemsContainer.className = "items";
		settings.appendChild(itemsContainer);

		var items = document.createElement("div");
		items.className = "filters";
		itemsContainer.appendChild(items);

		function refreshItems() {
			pages.updateCoupons(div, items, refreshItems, filterCategories, !showInactive, filterLikes, mybk).then(function (data) {
				var badge = filterBtn.querySelector(".badge");
				if (!badge) {
					badge = document.createElement("div");
					badge.className = "badge";
					filterBtn.appendChild(badge);
				}
				badge.textContent = data.count.toString();
			});
			var changed = showInactive || filterCategories.length > 0;
			if (filterBtn)
				filterBtn.children[0].src = changed ? "/img/icons/filter_filled.svg" : "/img/icons/filter.svg";
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

		var inactiveToggle = createFilterItem(undefined, "Versteckte/Abgelaufene Anzeigen", showInactive, function (active) {
			showInactive = active;
			refreshItems();
		});
		itemsContainer.appendChild(inactiveToggle);

		var div = this.openTitledGeneric("coupontiles", tile, "Deine Coupons", true, undefined, function () {
			var title = div.parentElement.querySelector(".title");
			var img = document.createElement("img");
			img.classList.add("subtitle");
			img.src = subtitle.src;
			title.appendChild(img);

			div.parentElement.appendChild(backdrop);
			div.parentElement.appendChild(settings);
		}, [
				{
					icon: "/img/icons/mybk.svg",
					callback: function (e) {
						mybk = !mybk;
						this.children[0].src = mybk ? "/img/icons/mybk_filled.svg" : "/img/icons/mybk.svg";
						refreshItems();
					}
				},
				{
					icon: "/img/icons/heart.svg",
					callback: function (e) {
						filterLikes = !filterLikes;
						this.children[0].src = filterLikes ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
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
					callback: function (e) {
						filterBtn = this;
						toggleFilters();
					}
				}
			]);

		div.classList.add("grid");
		refreshItems();
	},
	openDelivery: function (tile) {

	},
	openKingfinder: function (tile) {

	},
	openProducts: function (tile) {

	},
	openMybk: function (tile) {

	},
	openGeneric: function (tile) {

	},
	onClickCoupon: function (event) {
		var data = JSON.parse(this.parentElement.getAttribute("data"));
		console.log(data);
		var div = pages.openBlankGeneric("coupon", this.parentElement, true, function () {
			var container = document.createElement("div");
			container.className = "content";
			div.appendChild(container);

			var tile = document.createElement("div");
			tile.className = "bigtile";
			var content = renderTile(tile, data);
			content.classList.add("bigbranded");
			container.appendChild(tile);

			var qr = document.createElement("div");
			qr.className = "qrcode";
			qr.style.display = "none";
			qr.style.opacity = "0";

			var flag = document.createElement("div");
			flag.className = "flag";
			qr.appendChild(flag);

			var topLabel = document.createElement("p");
			topLabel.className = "toplabel";
			topLabel.textContent = "Bitte Code an der Kasse vorzeigen";
			qr.appendChild(topLabel);

			var code = document.createElement("div");
			code.className = "code";

			var canvas = document.createElement("canvas");
			/**
			 * @type {CanvasRenderingContext2D}
			 */
			var context;
			code.appendChild(canvas);
			var startFrame, endFrame;
			var mode = "QR";
			var barcode;
			var bitmap;
			var bits = [];
			var dpr = window.devicePixelRatio || 1;
			var canvasWidth, canvasHeight;
			var lastFrame = performance.now();

			function reinitCanvas() {
				var rect = qr.getBoundingClientRect();
				var self = code.getBoundingClientRect();
				canvas.style.width = "100%";
				canvasWidth = rect.width;
				canvasHeight = rect.height - (self.y - rect.y) * 2 - 40; // top = bottom space - label height
				canvas.width = canvasWidth * dpr;
				canvas.height = canvasHeight * dpr;
				startFrame = 0;
				endFrame = 0.15;

				barcode = data.barcodes[0];
				for (var i = 0; i < data.barcodes.length; i++) {
					if (data.barcodes[i].type == mode) {
						barcode = data.barcodes[i];
						break;
					}
				}

				context = canvas.getContext("2d");
				context.imageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.webkitImageSmoothingEnabled = false;

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
				} else {
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

						var codes = {
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

				var now = performance.now();
				var delta = (now - lastFrame) / 16.0;
				lastFrame = now;

				function animatedRect(w, h) {
					var speed = w / 3000 * delta;

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

					var start = startFrame;
					var end = endFrame;
					if (end < start)
						end++;

					var corners = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

					function mapPoint(time) {
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
					var overCorners = [];
					for (var i = 0; i < corners.length; i++) {
						if (start < corners[i] && end >= corners[i]) {
							overCorners.push(corners[i]);
						}
					}
					if (overCorners.length) {
						start = mapPoint(start);
						end = mapPoint(end);
						context.moveTo(start[0], start[1]);
						for (var i = 0; i < overCorners.length; i++) {
							var overCorner = mapPoint(overCorners[i]);
							context.lineTo(overCorner[0], overCorner[1]);
						}
						context.lineTo(end[0], end[1]);
					} else {
						start = mapPoint(start);
						end = mapPoint(end);
						context.moveTo(start[0], start[1]);
						context.lineTo(end[0], end[1]);
					}
					context.stroke();
					context.closePath();

					var ds = mode == "QR" ? 5 : 6;
					var de = mode == "QR" ? 12 : 14;

					var grad = context.createRadialGradient(0, 0, ds * s, 0, 0, de * s);
					context.beginPath();
					grad.addColorStop(0, "#fcf6f0ff");
					grad.addColorStop(1, "#fcf6f000");
					context.fillStyle = grad;
					context.fillRect(-s, -s, (de + 1) * s, (de + 1) * s);
					context.closePath();

					var grad = context.createRadialGradient(w * s, h * s, ds * s, w * s, h * s, de * s);
					context.beginPath();
					grad.addColorStop(0, "#fcf6f0ff");
					grad.addColorStop(1, "#fcf6f000");
					context.fillStyle = grad;
					context.fillRect((w - de) * s, (h - de) * s, (de + 1) * s, (de + 1) * s);
					context.closePath();
				}

				context.clearRect(-100, -100, canvasWidth + 200, canvasHeight + 200);

				var s = mode == "QR" ? canvasHeight / 30 : canvasWidth / 50;
				context.resetTransform();
				context.scale(dpr, dpr);

				var w = mode == "QR" ? 30 : 40;
				var h = mode == "QR" ? 30 : 13;

				if (mode == "QR") {
					context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
					animatedRect(w, h);

					context.drawImage(bitmap, 3 * s, 3 * s, 24 * s, 24 * s);
				} else if (mode == "EAN-13") {
					var step = Math.floor(1 / bits.length * canvas.width) / dpr;

					w = (6 + step * bits.length / s);
					context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
					animatedRect(w, h);

					context.drawImage(bitmap, 3 * s, 2 * s - 1);
				}

				if (requestAnimationFrame)
					requestAnimationFrame(redraw);
				else
					setTimeout(redraw, 16);
			}

			var codeLabel = document.createElement("div");
			codeLabel.textContent = data.plu;
			codeLabel.className = "label";
			code.appendChild(codeLabel);

			qr.appendChild(code);

			var bottomLabel = document.createElement("p");
			bottomLabel.className = "bottomlabel";
			bottomLabel.textContent = "Zu EAN-Code wechseln";
			qr.appendChild(bottomLabel);
			bottomLabel.addEventListener("click", function () {
				mode = mode == "QR" ? "EAN-13" : "QR";
				bottomLabel.textContent = "Zu " + (mode == "QR" ? "EAN-Code" : "QR-Code") + " wechseln";
				reinitCanvas();
			});

			tile.appendChild(qr);

			var redeem = document.createElement("div");
			redeem.className = "redeembtn";
			redeem.textContent = "Einlösen";
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
				} else {
					qr.style.opacity = "0";
					qr.style.display = "none";
					if (context)
						context.clearRect(0, 0, canvasWidth, canvasHeight);
					context = null;
				}
			});

			var infos = document.createElement("div");
			infos.className = "highlit-panel coupon-panel";

			var name = document.createElement("h3");
			name.textContent = data.title.replace(/®/g, ""); // the ® sign looks too weird, so we strip it out from the big title
			infos.appendChild(name);

			if (typeof data.description == "string" && data.description.length > 0) {
				var desc = document.createElement("p");
				desc.className = "description";
				desc.textContent = data.description;
				infos.appendChild(desc);
			}

			var price = document.createElement("p");
			price.className = "price";
			price.textContent = data.price;
			infos.appendChild(price);

			var extra = document.createElement("h4");
			extra.textContent = "Teilnehmende Restaurants";
			infos.appendChild(extra);

			container.appendChild(infos);

			var maps = document.createElement("img");
			maps.className = "fullmaps";
			maps.src = "/img/generic_maps.png";
			container.appendChild(maps);

			var details = document.createElement("div");
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
								text: "Gutscheine statt Geldscheine.\n" + data.title + " für " + data.price + "\n",
								url: "burgerking://coupons/" + data.id
							})
						}
					}
				}
			])
	},
	/**
	 * @param {HTMLElement} div
	 * @param {HTMLElement} settings
	 */
	updateCoupons: function (div, settings, updateFilters, filterCategories, onlyActive, filterLikes, mybk) {
		while (div.hasChildNodes())
			div.removeChild(div.lastChild);

		var categories = meta.getProductCategories();

		var couponClickHandler = this.onClickCoupon;
		var self = this;
		return api.getCoupons(undefined, onlyActive, undefined, undefined, filterLikes ? likes.getIds() : undefined, mybk).then(function (rows) {
			var flattend = [];
			var count = 0;
			var usedCategories = [];
			var unfullRows = [];

			self.currentRows = rows;
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var tr = document.createElement("div");
				tr.className = "row";
				div.appendChild(tr);
				for (var j = 0; j < row.length; j++) {
					var cell = row[j];
					var td = document.createElement("div");
					td.className = "tile";
					if (cell._active === false) {
						td.classList.add("inactive");
						var expires = new Date(cell.to * 1000);
						var now = new Date();
						var diff = now.getTime() - expires.getTime();
						if (diff > 30 * 24 * 60 * 60 * 1000)
							td.classList.add("old");
					}
					var content = renderTile(td, cell);
					content.addEventListener("click", couponClickHandler);
					if (autoNavigate) {
						autoNavigate = false;
						setTimeout(function () {
							content.click();
						}, 400);
					}
					flattend.push(cell);

					var anyUsed = false;
					if (Array.isArray(cell.categories))
						for (var k = 0; k < cell.categories.length; k++) {
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
			}

			function computeRowWidth(row) {
				var total = 0;
				for (var i = 0; i < row.children.length; i++) {
					var w = row.children[i].getAttribute("width");
					if (w !== null)
						total += parseInt(w);
				}
				return total;
			}

			while (unfullRows.length > 0) {
				var first = unfullRows[0];
				var len = computeRowWidth(first);
				for (var i = 1; i < unfullRows.length; i++) {
					var other = computeRowWidth(unfullRows[i]);
					if (len + other <= 4) {
						len += other;
						for (var j = 0; j < unfullRows[i].children.length; j++)
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

			categories.then(function (data) {
				for (var i = data.length - 1; i >= 0; i--)
					if (usedCategories.indexOf(data[i].id) == -1)
						data.splice(i, 1);

				data.sort(function (a, b) {
					return a.id - b.id;
				});

				while (settings.hasChildNodes())
					settings.removeChild(settings.lastChild);

				for (var i = 0; i < data.length; i++) {
					var item = createFilterItem(data[i].icon.url, data[i].title, filterCategories.indexOf(data[i].id) != -1,
						function (active) {
							var id = parseInt(this.getAttribute("data-id"));

							var index = filterCategories.indexOf(id);
							while (index != -1) {
								filterCategories.splice(index, 1);
								index = filterCategories.indexOf(id);
							}
							if (active)
								filterCategories.push(id);

							updateFilters();
						});
					item.setAttribute("data-id", data[i].id);
					// app doesn't color the text, idk what it does with the color
					// item.style.color = "#" + data[i].color.substr(0, 6);
					settings.appendChild(item);
				}
			});

			return {
				items: flattend,
				count: count,
				categories: usedCategories
			};
		});
	},
	onClickPromo: function (event, pointer, cellElement, cellIndex) {
		var data = JSON.parse(cellElement.getAttribute("data-json"));
		var activePromo = data.promoId;
		var promos = api.getPromos();
		var div = pages.openBlankGeneric("promos", cellElement, true, function () {
			promos.then(function (promos) {
				var carousel = document.createElement("div");
				carousel.className = "carousel";
				div.appendChild(carousel);

				var targetIndex;
				for (var i = 0; i < promos.length; i++) {
					var cell = document.createElement("div");
					cell.className = "carousel-cell promo";
					renderPromo(cell, promos[i]);
					carousel.appendChild(cell);
					if (promos[i].id == activePromo)
						targetIndex = i;
				}

				var flkty = new Flickity(carousel, {
					lazyLoad: 1,
					prevNextButtons: false,
					contain: true,
					wrapAround: false,
					adaptiveHeight: true,
					pageDots: false,
					initialIndex: targetIndex
				});
				flkty.on("change", function (index) {
					activePromo = promos[index].id;
					console.log(activePromo);
				});
				// TODO: add page dots to footer (generic API)
			});
		}, [
				{
					icon: "/img/icons/share.svg",
					callback: function () {
						if (navigator.share) {
							navigator.share({
								text: "Wir haben die News. Du hast den Hunger.\n", // <-- WTF burger king
								url: "burgerking://promos/" + activePromo
							})
						}
					}
				}
			]);
	}
};

function insertImages(div, images, attr) {
	if (attr === undefined)
		attr = "src";

	if (images.bgImage) {
		var img1 = document.createElement("img");
		img1.setAttribute(attr, images.bgImage.url);
		div.appendChild(img1);
	}

	if (images.fgImage) {
		var img2 = document.createElement("img");
		img2.setAttribute(attr, images.fgImage.url);
		div.appendChild(img2);
	}
}

function renderTile(div, tile) {
	if (tile.images.bgColor.length == 6)
		div.style.backgroundColor = "#" + tile.images.bgColor;
	div.setAttribute("width", tile.dimension.width);
	div.setAttribute("height", tile.dimension.height);
	div.setAttribute("data", JSON.stringify(tile));

	var content = document.createElement("div");
	content.className = "content wonky";
	insertImages(content, tile.images);
	div.appendChild(content);

	var like = document.createElement("img");
	like.className = "like";
	like.src = likes.check(tile.id) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
	like.addEventListener("click", function () {
		this.src = likes.toggle(tile.id) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
	});
	div.appendChild(like);

	return content;
}

function renderPromo(div, promo) {
	var img = document.createElement("div");
	img.className = "promoimg";
	insertImages(img, promo.images, "data-flickity-lazyload");
	div.appendChild(img);

	var infos = document.createElement("div");
	infos.className = "highlit-panel promo-panel htmlview";
	div.appendChild(infos);

	var name = document.createElement("h3");
	name.textContent = promo.title.replace(/®/g, ""); // the ® sign looks too weird, so we strip it out from the big title
	infos.appendChild(name);

	if (typeof promo.description == "string" && promo.description.length > 0) {
		insertHTMLInto(promo.description, infos);
	}

	var footnote = document.createElement("div");
	footnote.className = "highlit-panel promo-panel footnote htmlview";
	div.appendChild(footnote);
	if (typeof promo.footnote == "string" && promo.footnote.length > 0) {
		insertHTMLInto(promo.footnote, footnote);
	}
}

function createFilterItem(imgUrl, label, initial, onToggle) {
	var item = document.createElement("div");
	item.className = "item";

	if (imgUrl) {
		var img = document.createElement("img");
		img.src = imgUrl;
		item.appendChild(img);
	}

	var text = document.createElement("span");
	text.className = "title";
	text.textContent = label;
	item.appendChild(text);

	var check = document.createElement("i");
	check.className = "checkbox mdi mdi-check";
	check.style.display = initial ? "" : "none";
	item.appendChild(check);

	item.onclick = function () {
		var checkbox = this.querySelector(".checkbox");
		var active = checkbox.style.display != "none";
		active = !active;
		checkbox.style.display = active ? "" : "none";
		onToggle.call(this, active);
	};
	return item;
}

var tiles = document.querySelectorAll(".tile");
for (var i = 0; i < tiles.length; i++)
	tiles[i].addEventListener("click", function () {
		clickTile(this);
	});

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
		.then(function (reg) {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope);
			reg.update();
		}).catch(function (error) {
			// registration failed
			console.log('Registration failed with ' + error);
		});
}

window.addEventListener('popstate', function () {
	pages.back(true);
});

var likes = {
	data: null,
	load: function () {
		var str = window.localStorage.getItem("likes");
		if (str && str[0] == '{')
			this.data = JSON.parse(str);
		else
			this.data = {};
	},
	save: function () {
		window.localStorage.setItem("likes", JSON.stringify(this.data));
	},
	check: function (id) {
		id = id.toString();
		if (this.data == null)
			this.load();
		return !!this.data[id];
	},
	toggle: function (id) {
		id = id.toString();
		var val = !this.check(id);
		this.set(id, val);
		return val;
	},
	set: function (id, liked) {
		id = id.toString();
		if (this.data == null)
			this.load();
		this.data[id] = liked;
		this.save();
	},
	getIds: function () {
		if (this.data == null)
			this.load();
		var ids = [];
		for (var key in this.data) {
			if (this.data.hasOwnProperty(key) && this.data[key]) {
				ids.push(parseInt(key));
			}
		}
		return ids;
	}
};

var meta = {
	data: null,
	required: ["productCategories"],
	getData: function () {
		if (this.data)
			return Promise.resolve(this.data);
		else {
			var self = this;
			return api.getFlags(this.required).then(function (data) {
				self.data = data;
				return data;
			});
		}
	},
	/**
	 * @returns {Promise<{ id: number, image: { url: string }, title: string, color: string, icon: { url: string } }[]>}
	 */
	getProductCategories: function () {
		return this.getData().then(function (data) {
			// duplicate data
			return JSON.parse(JSON.stringify(data["productCategories"]));
		});
	}
};

function insertHTMLInto(htmlText, elem) {
	var footnote = new DOMParser().parseFromString(htmlText, "text/html").body;
	function filterHTMLElement(elem) {
		var tag = "";
		if (["SMALL", "P", "DIV", "A"].indexOf(elem.tagName) != -1) {
			tag = elem.tagName;
		} else {
			return document.createTextNode(elem.textContent);
		}

		var ret = document.createElement(tag);
		var allowedAttrs = {
			A: ["href", "tabindex"]
		}
		var attrs = allowedAttrs[tag];
		if (attrs) {
			for (var i = 0; i < attrs.length; i++) {
				var attr = elem.getAttribute(attrs[i]);
				if (attr !== null)
					ret.setAttribute(attrs[i], attr);
			}
		}

		if (tag == "A") {
			ret.setAttribute("target", "_blank");
		}

		for (var i = 0; i < elem.childNodes.length; i++) {
			ret.appendChild(filterHTMLElement(elem.childNodes[i]));
		}
		return ret;
	}
	for (var i = 0; i < footnote.children.length; i++)
		elem.appendChild(filterHTMLElement(footnote.children[i]));
}

var _didLoad = false;
function _loadCB() {
	if (_didLoad)
		return;
	_didLoad = true;
	pages.onLoad();
}
try { document.addEventListener("DOMContentLoaded", _loadCB, false); } catch (e) { console.error("failed attaching load event", e); }
try { window.addEventListener("load", _loadCB, false); } catch (e) { console.error("failed attaching load event", e); }
try { document.attachEvent("onreadystatechange", _loadCB, false); } catch (e) { }

if (autoNavigate)
	window.onload = function () { pages.openCoupons() };

window.addEventListener("beforeinstallprompt", function (e) {
	var banner = document.createElement("div");
	banner.style.position = "fixed";
	banner.style.left = "0";
	banner.style.top = "0";
	banner.style.width = "100%";
	banner.style.height = "32px";
	banner.style.zIndex = "100000";
	banner.style.backgroundColor = "#ffffff";

	var install = document.createElement("button");
	install.textContent = "Add to homescreen";
	install.onclick = function () {
		e.prompt();
		banner.parentElement.removeChild(banner);
	};
	banner.appendChild(install);

	var cancel = document.createElement("button");
	cancel.textContent = "Cancel";
	cancel.onclick = function () {
		banner.parentElement.removeChild(banner);
	};
	banner.appendChild(cancel);

	document.body.appendChild(banner);
});

document.querySelector(".home footer .refresh").addEventListener("click", function () {
	window.location.reload();
});
