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
	show: function (actions) {
		this.element.classList.remove("hidden");
	},
	hide: function () {
		this.element.classList.add("hidden");
	}
};
bottomBar.element.querySelector(".close").addEventListener("click", function () {
	pages.home(); // for now, just jump to home
});

var pages = {
	animation: undefined,
	cancelAnimation: undefined,
	/**
	 * @param {HTMLElement} tile 
	 * @param {Function?} animationDone 
	 */
	openBlankGeneric: function (tile, withBottomBar, animationDone) {
		// TODO: push history so we can go back
		var div = document.createElement("div");
		div.className = "subpage loading" + (withBottomBar ? " bottomless" : "");
		var rect = tile.getBoundingClientRect();
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
						subPages[i].parentElement.removeChild(subPages[i]);
				document.querySelector(".home").style.display = "none";

				pages.cancelAnimation = undefined;
				if (animationDone) animationDone();
			}, 300);
		}, 10);

		if (withBottomBar)
			bottomBar.show();

		return div;
	},
	openTitledGeneric: function (tile, title, withBottomBar, animationDone, titleAnimationDone) {
		var titleDiv = document.createElement("div");
		titleDiv.className = "title branded loading";
		titleDiv.textContent = title;
		var content = document.createElement("div");
		content.className = "content";
		var div = this.openBlankGeneric(tile, withBottomBar, function () {
			titleDiv.classList.add("animating");
			pages.animation = setTimeout(function () {
				titleDiv.classList.remove("animating");
				titleDiv.classList.remove("loading");
				if (titleAnimationDone) titleAnimationDone();
			}, 200);
			if (animationDone) animationDone();
		});
		div.classList.add("titled");
		div.appendChild(titleDiv);
		div.appendChild(content);
		return content;
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
		var div = this.openTitledGeneric(tile, "Deine Coupons", true, undefined, function () {
			var title = div.parentElement.querySelector(".title");
			var img = document.createElement("img");
			img.classList.add("subtitle");
			img.src = subtitle.src;
			title.appendChild(img);
		});

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
	/**
	 * @param {HTMLElement} div
	 */
	updateCoupons: function (div, filterCategories, onlyActive) {
		while (div.hasChildNodes())
			div.removeChild(div.lastChild);
		api.getCoupons(filterCategories, onlyActive).then(function (rows) {
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var tr = document.createElement("div");
				tr.className = "row";
				div.appendChild(tr);
				for (var j = 0; j < row.length; j++) {
					var cell = row[j];
					var td = document.createElement("div");
					td.className = "tile";
					if (cell.images.bgColor.length == 6)
						td.style.backgroundColor = cell.images.bgColor;
					td.setAttribute("width", cell.dimension.width);
					td.setAttribute("height", cell.dimension.height);
					td.setAttribute("data", JSON.stringify(cell));
					tr.appendChild(td);

					var content = document.createElement("div");
					content.className = "content wonky";

					if (cell.images.bgImage) {
						var img1 = document.createElement("img");
						img1.src = cell.images.bgImage.url;
						content.appendChild(img1);
					}

					if (cell.images.fgImage) {
						var img2 = document.createElement("img");
						img2.src = cell.images.fgImage.url;
						content.appendChild(img2);
					}

					td.appendChild(content);
				}
			}
		});
	}
};

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