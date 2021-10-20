///<reference path="../commons.ts" />

class Pages {
	animation?: number;
	cancelAnimation?: Function;
	stack: { div: HTMLDivElement, withBottomBar: boolean, name: string, actions?: PageAction[] }[] = [];

	openBlankGeneric(name: string, tile: HTMLElement | undefined, withBottomBar: boolean, animationDone?: Function, actions?: PageAction[]): HTMLDivElement {
		const div = document.createElement("div");
		this.stack.push({ div: div, withBottomBar: withBottomBar, actions: actions, name: name });
		window.history.pushState({ name: name }, "", "#" + name);
		const slash = name.lastIndexOf("/");
		const subname = slash == -1 ? "" : (" " + name.substr(0, slash + 1).replace(/[^a-zA-Z0-9]/g, "_") + "arg");
		div.className = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_") + subname + " subpage loading" + (withBottomBar ? " bottomless" : "");
		const rect = tile ? tile.getBoundingClientRect() : { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50, width: 100, height: 100 };
		div.style.left = ((<any>rect).x || 0) + "px";
		div.style.top = ((<any>rect).y || 0) + "px";
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

				const subPages = <NodeListOf<HTMLElement>>document.querySelectorAll(".subpage");
				for (let i = 0; i < subPages.length; i++)
					if (subPages[i] != div)
						subPages[i].style.display = "none";
				(<HTMLElement>querySelectorOrThrow(".home", true)).style.display = "none";

				pages.cancelAnimation = undefined;
				if (animationDone) animationDone();
			}, 300);
		}, 10);

		if (withBottomBar)
			bottomBar.show(actions);

		return div;
	}

	openTitledGeneric(name: string, tile: HTMLElement | undefined, title: string, withBottomBar: boolean, animationDone?: Function, titleAnimationDone?: (titleDiv: HTMLDivElement) => any, actions?: PageAction[]): HTMLDivElement {
		const titleDiv = document.createElement("div");
		titleDiv.className = "title branded loading";
		titleDiv.textContent = title;
		const content = document.createElement("div");
		content.className = "content";
		const div = this.openBlankGeneric(name, tile, withBottomBar, function () {
			titleDiv.classList.add("animating");
			pages.animation = setTimeout(function () {
				titleDiv.classList.remove("animating");
				titleDiv.classList.remove("loading");
				if (titleAnimationDone) titleAnimationDone(titleDiv);
			}, 200);
			if (animationDone) animationDone();
		}, actions);
		div.classList.add("titled");
		div.appendChild(titleDiv);
		div.appendChild(content);
		return content;
	}

	openSlideup(name: string): HTMLDivElement {
		const div = document.createElement("div");
		this.stack.push({ div: div, withBottomBar: false, name: name });
		const slash = name.lastIndexOf("/");
		const subname = slash == -1 ? "" : (" " + name.substr(0, slash + 1).replace(/[^a-zA-Z0-9]/g, "_") + "arg");
		div.className = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_") + subname + " loading hidden slideup-popup";
		document.body.appendChild(div);
		pages.cancelAnimation = function () {
			document.body.removeChild(div);
		};
		pages.animation = setTimeout(function () {
			div.classList.remove("hidden");
			pages.animation = setTimeout(function () {
				div.classList.remove("loading");
				pages.cancelAnimation = undefined;
			}, 120);
		}, 10);

		return div;
	}

	back(noHistory?: boolean): void {
		const page = this.stack.pop();
		if (page && !noHistory && window.history.state && window.history.state.name == page.name) {
			this.stack.push(page);
			return window.history.back();
		}

		clearTimeout(pages.animation);
		if (pages.cancelAnimation) pages.cancelAnimation();

		if (page) {
			document.body.removeChild(page.div);
		}

		if (this.stack.length == 0) {
			this.home();
		} else {
			const current = this.stack[this.stack.length - 1];
			const subPages = <NodeListOf<HTMLElement>>document.querySelectorAll(".subpage");
			for (let i = 0; i < subPages.length; i++)
				subPages[i].style.display = subPages[i] == current.div ? "" : "none";

			if (current.withBottomBar)
				bottomBar.show(current.actions);
		}
	}

	home() {
		clearTimeout(pages.animation);
		if (pages.cancelAnimation) pages.cancelAnimation();
		(<HTMLElement>querySelectorOrThrow(".home", true)).style.display = "";
		const subPages = <NodeListOf<HTMLElement>>document.querySelectorAll(".subpage");
		for (var i = 0; i < subPages.length; i++) {
			const page = subPages[i];
			if (page && page.parentElement)
				page.parentElement.removeChild(page);
		}
		bottomBar.hide();
	}

	onLoad() {
		const promos = document.querySelector('[data-type="menuPromo"]');
		if (promos) {
			const carousel = document.createElement("div");
			carousel.className = "promolist carousel";
			promos.appendChild(carousel);

			const data = promos.getAttribute("data-json");
			if (data) {
				const items = JSON.parse(data).promos;

				for (let i = 0; items && i < items.length; i++) {
					if (items[i].promoId && ignoredPromos.indexOf(items[i].promoId) != -1)
						continue;

					const promo = document.createElement("div");
					promo.setAttribute("data-json", JSON.stringify(items[i]));
					promo.className = "carousel-cell promo";
					insertImages(promo, items[i].images, "data-flickity-lazyload");
					carousel.appendChild(promo);
				}

				const flkty = new Flickity(carousel, {
					lazyLoad: 1,
					prevNextButtons: false,
					wrapAround: true
				});
				flkty.on("staticClick", pages.onClickPromo);
			}
		}
		updateUsernames();

		querySelectorOrThrow(".home > header", true).addEventListener("dblclick", changeUsername);
		querySelectorOrThrow(".home > footer > .flag", true).addEventListener("click", pages.changeLanguage);
	}

	openDelivery(tile: Tile) { }
	openKingfinder(tile: Tile) { }
	openProducts(tile: Tile) { }
	openMybk(tile: Tile) { }
	openGeneric(tile: Tile) { }

	changeLanguage() {
		let div = pages.openTitledGeneric("countrysel", undefined, translations.page_country, true, undefined, function () {
			let title = div.parentElement!.querySelectorOrThrow(".title", true);
			let subtitle = document.createElement("p");
			subtitle.textContent = translations.page_country_subtitle;
			title.appendChild(subtitle);

			let itemsContainer = document.createElement("div");
			itemsContainer.className = "items";
			div.appendChild(itemsContainer);
			for (let i = 0; i < availableLanguages.length; i++) {
				let lang = availableLanguages[i];
				let item = createFilterItem(".flag.flag-" + lang.id.substr(3, 2).toLowerCase(), lang.name, lang.id == language, function (active) {
					if (!active)
						return false;
					let id = this.getAttribute("data");
					console.log("selected language " + id);
					if (id == null)
						return false;
					window.localStorage.setItem("language", id);
					window.location.href = "/" + id;
				});
				item.setAttribute("data", lang.id);
				itemsContainer.appendChild(item);
			}
			itemsContainer.appendChild(createFilterItem(undefined, "Reset (Browser Language)", false, function () {
				window.localStorage.removeItem("language");
				window.location.href = "/";
			}));
		});
	}
}

const pages = new Pages();

function createFilterItem(imgUrl: string | undefined, label: string, initial: boolean, onToggle: (this: HTMLDivElement, active: boolean) => any) {
	let item = document.createElement("div");
	item.className = "item";

	if (typeof imgUrl == "string" && imgUrl.startsWith(".")) {
		let img = document.createElement("div");
		img.className = "icon" + imgUrl.replace(/\./g, " ");
		item.appendChild(img);
	} else if (typeof imgUrl == "string") {
		let img = document.createElement("img");
		img.src = imgUrl;
		item.appendChild(img);
	}

	let text = document.createElement("span");
	text.className = "title";
	text.textContent = label;
	item.appendChild(text);

	let check = document.createElement("i");
	check.className = "checkbox mdi mdi-check";
	check.style.display = initial ? "" : "none";
	item.appendChild(check);

	function toggleDisplay(active: boolean) {
		check.style.display = active ? "" : "none";
	}

	item.onclick = function () {
		let active = check.style.display != "none";
		active = !active;
		toggleDisplay(active);
		if (onToggle.call(item, active) === false) {
			toggleDisplay(!active);
		}
	};
	return item;
}

