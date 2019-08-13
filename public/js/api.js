var api = {
	getCoupons: function (filterCategories, onlyActive, limit, allGeo, filterIds, mybk) {
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
		url += "region=" + encodeURIComponent(region);
		return fetch(url).then(function (response) { return response.json(); });
	},
	getPromos: function (filterStore, onlyActive, limit) {
		var url = "/api/promos?";
		if (filterStore !== undefined)
			url += "filterStore=" + encodeURIComponent(filterStore) + "&";
		if (onlyActive !== undefined)
			url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
		if (limit !== undefined)
			url += "limit=" + encodeURIComponent(limit) + "&";
		url += "region=" + encodeURIComponent(region);
		return fetch(url).then(function (response) { return response.json(); });
	},
	getFlags: function (flags, onlyActive) {
		var url = "/api/flags?flags=" + encodeURIComponent(JSON.stringify(flags)) + "&";
		if (onlyActive !== undefined)
			url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
		url += "region=" + encodeURIComponent(region);
		return fetch(url).then(function (response) { return response.json(); });
	},
};