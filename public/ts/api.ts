declare var region: string;
declare var language: string;
declare var availableLanguages: { id: string, name: string }[];
declare var translations: { [index: string]: string };

interface Image {
	url: string;
	modified: number;
}

interface Images {
	bgImage: Image | null;
	fgImage: Image | null;
	parallax: boolean;
	bgColor: string | null;
}

interface CouponBarcode {
	type: string;
	value: string;
}

interface ItemCommons {
	id: number;
	modified: number;
	title: string;
	images: Images;
	from: number | null;
	to: number | null;
}

interface TileCommons extends ItemCommons {
	dimension: { width: number, height: number };
}

interface Coupon extends TileCommons {
	description: string;
	footnote: string;
	price: string;
	plu: string;
	barcodes: CouponBarcode[];
	categories: number[];
	myBkOnly: boolean;
	myBkOnetime: boolean;
	hidden: boolean;
	secret: boolean;
	_active: boolean;
	_promo: boolean;
	_hasParent: boolean;
}

interface Promo extends ItemCommons {
	description?: string;
	footnote?: string;
	products?: number[];
	storesFilter?: string;
}

const api = {
	async getCoupons(
		filterCategories?: number[],
		onlyActive?: boolean,
		limit?: number,
		allGeo?: boolean,
		filterIds?: number[],
		mybk?: boolean,
		compactRows?: boolean,
		showPromo?: boolean):
		Promise<Coupon[][]> {
		var url = "/api/coupons?";
		if (filterCategories !== undefined)
			url += "filterCategories=" + encodeURIComponent(JSON.stringify(filterCategories)) + "&";
		if (filterIds !== undefined)
			url += "filterIds=" + encodeURIComponent(JSON.stringify(filterIds)) + "&";
		if (onlyActive !== undefined)
			url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
		if (limit !== undefined)
			url += "limit=" + encodeURIComponent(limit) + "&";
		if (allGeo !== undefined)
			url += "allGeo=" + encodeURIComponent(allGeo ? "true" : "false") + "&";
		if (mybk !== undefined)
			url += "mybk=" + encodeURIComponent(mybk ? "true" : "false") + "&";
		if (compactRows !== undefined)
			url += "compactRows=" + encodeURIComponent(compactRows ? "true" : "false") + "&";
		if (showPromo !== undefined)
			url += "showPromo=" + encodeURIComponent(showPromo ? "true" : "false") + "&";
		url += "region=" + encodeURIComponent(region);
		const response = await fetch(url);
		return await response.json();
	},
	async getPromos(
		filterStore?: string,
		onlyActive?: boolean,
		limit?: number):
		Promise<Promo[]> {
		var url = "/api/promos?";
		if (filterStore !== undefined)
			url += "filterStore=" + encodeURIComponent(filterStore) + "&";
		if (onlyActive !== undefined)
			url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
		if (limit !== undefined)
			url += "limit=" + encodeURIComponent(limit) + "&";
		url += "region=" + encodeURIComponent(region);
		const response = await fetch(url);
		return await response.json();
	},
	async getFlags(
		flags?: string[],
		onlyActive?: boolean):
		Promise<{ [index: string]: object[] }> {
		var url = "/api/flags?flags=" + encodeURIComponent(JSON.stringify(flags)) + "&";
		if (onlyActive !== undefined)
			url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
		url += "region=" + encodeURIComponent(region);
		const response = await fetch(url);
		return await response.json();
	},
};