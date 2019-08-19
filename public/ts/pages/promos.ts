///<reference path="pages.ts" />
///<reference path="../commons.ts" />

interface Pages {
	onClickPromo(event?: Event, pointer?: Element | Touch, cellElement?: Element, cellIndex?: number): void;
}

Pages.prototype.onClickPromo = function (event, pointer, cellElement, cellIndex) {
	if (!cellElement)
		return;

	const json = cellElement.getAttribute("data-json");
	if (!json)
		return;

	const data = JSON.parse(json);
	let activePromo = data.promoId;
	const promosWaiter = api.getPromos();
	const div = pages.openBlankGeneric("promos", <HTMLElement>cellElement, true, async function () {
		const promos = await promosWaiter;
		const carousel = document.createElement("div");
		carousel.className = "carousel";
		div.appendChild(carousel);

		let targetIndex: number | undefined;
		for (let i = 0; i < promos.length; i++) {
			if (promos[i].id && ignoredPromos.indexOf(promos[i].id) != -1)
				continue;

			const cell = document.createElement("div");
			cell.className = "carousel-cell promo";
			renderPromo(cell, promos[i]);
			carousel.appendChild(cell);
			if (promos[i].id == activePromo)
				targetIndex = i;
		}

		const flkty = new Flickity(carousel, {
			lazyLoad: 1,
			prevNextButtons: false,
			contain: true,
			wrapAround: false,
			adaptiveHeight: true,
			pageDots: false,
			initialIndex: targetIndex
		});
		(<any>flkty).on("change", (index: number) => {
			activePromo = promos[index].id;
			console.log(activePromo);
		});
		// TODO: add page dots to footer (generic API)
	}, [
			{
				icon: "/img/icons/share.svg",
				callback: function () {
					if (navigator.share) {
						navigator.share({
							text: translations.promo_share,
							url: "burgerking://promos/" + activePromo
						})
					}
				}
			}
		]);
};

function renderPromo(div: HTMLDivElement, promo: Promo) {
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
