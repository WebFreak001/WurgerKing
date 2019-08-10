var autoNavigate = false;

function clickTile(tile) {
	var type = tile.getAttribute("data-type");
	console.log("click " + type)
	switch (type) {
		case "menuPromo":
			pages.openPromo(tile);
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
	back: function () {
		clearTimeout(pages.animation);
		if (pages.cancelAnimation) pages.cancelAnimation();
		var page = this.stack.pop();
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
	openPromo: function (tile) {

	},
	openCoupons: function (tile) {
		var subtitle = new Image();
		subtitle.src = "/img/subtitle_coupons.png";
		var div = this.openTitledGeneric("coupontiles", tile, "Deine Coupons", true, undefined, function () {
			var title = div.parentElement.querySelector(".title");
			var img = document.createElement("img");
			img.classList.add("subtitle");
			img.src = subtitle.src;
			title.appendChild(img);
		}, [
				{
					icon: "/img/icons/mybk.svg",
					callback: function (e) {
					}
				},
				{
					icon: "/img/icons/heart.svg",
					callback: function (e) {
						this.children[0].src = "/img/icons/heart_filled.svg";
					}
				},
				{
					icon: "/img/icons/search.svg",
					callback: function (e) {
					}
				},
				{
					icon: "/img/icons/filter.svg",
					callback: function (e) {
						this.children[0].src = "/img/icons/filter_filled.svg";
					}
				}
			]);

		div.classList.add("grid");
		pages.updateCoupons(div);
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

			function reinitCanvas() {
				var rect = qr.getBoundingClientRect();
				var self = code.getBoundingClientRect();
				canvas.style.width = "100%";
				canvas.width = rect.width;
				canvas.height = rect.height - self.y * 2 - 40; // top = bottom space - label height
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
						bitmap = undefined;
					}
				}
			}

			function redraw() {
				if (!context)
					return;

				function animatedRect(w, h) {
					var speed = w / 5000;

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

				context.clearRect(-100, -100, canvas.width + 200, canvas.height + 200);

				var s = mode == "QR" ? canvas.height / 30 : canvas.width / 50;
				context.resetTransform();

				var w = mode == "QR" ? 30 : 40;
				var h = mode == "QR" ? 30 : 13;

				if (mode == "QR") {
					context.translate((canvas.width - w * s) / 2, (canvas.height - h * s) / 2);
					animatedRect(w, h);

					context.drawImage(bitmap, 3 * s, 3 * s, 24 * s, 24 * s);
				} else if (mode == "EAN-13") {
					var step = Math.floor(1 / bits.length * canvas.width);

					w = (6 + step * bits.length / s);

					context.translate((canvas.width - w * s) / 2, (canvas.height - h * s) / 2);
					animatedRect(w, h);

					context.beginPath();
					context.fillStyle = "#682f1c";
					context.translate(-0.5, -0.5);
					for (var x = 0; x < bits.length; x++) {
						if (bits[x] != 0)
							context.rect(x * step + 3 * s, 2 * s - 1, step, (h - 4) * s);
						context.fill();
					}
					context.translate(0.5, 0.5);
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
						context.clearRect(0, 0, canvas.width, canvas.height);
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
						context.clearRect(0, 0, canvas.width, canvas.height);
					context = null;
				}
			});

			var infos = document.createElement("div");
			infos.className = "highlit-panel coupon-panel";

			var name = document.createElement("h3");
			name.textContent = data.title;
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
		}, [
				{
					icon: "/img/icons/share.svg",
					callback: function () {
						if (navigator.share) {
							navigator.share({
								text: "Gutscheine statt Geldscheine.\n" + data.title + " für " + data.price,
								url: "burgerking://coupons/" + data.id
							})
						}
					}
				}
			])
	},
	/**
	 * @param {HTMLElement} div
	 */
	updateCoupons: function (div, filterCategories, onlyActive) {
		while (div.hasChildNodes())
			div.removeChild(div.lastChild);
		var couponClickHandler = this.onClickCoupon;
		var self = this;
		api.getCoupons(filterCategories, onlyActive).then(function (rows) {
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
					var content = renderTile(td, cell);
					content.addEventListener("click", couponClickHandler);
					if (autoNavigate) {
						autoNavigate = false;
						setTimeout(function () {
							content.click();
						}, 400);
					}
					tr.appendChild(td);
				}
			}
		});
	}
};

function renderTile(div, tile) {
	if (tile.images.bgColor.length == 6)
		div.style.backgroundColor = "#" + tile.images.bgColor;
	div.setAttribute("width", tile.dimension.width);
	div.setAttribute("height", tile.dimension.height);
	div.setAttribute("data", JSON.stringify(tile));

	var content = document.createElement("div");
	content.className = "content wonky";

	if (tile.images.bgImage) {
		var img1 = document.createElement("img");
		img1.src = tile.images.bgImage.url;
		content.appendChild(img1);
	}

	if (tile.images.fgImage) {
		var img2 = document.createElement("img");
		img2.src = tile.images.fgImage.url;
		content.appendChild(img2);
	}

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
		}).catch(function (error) {
			// registration failed
			console.log('Registration failed with ' + error);
		});
}

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
	}
};

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