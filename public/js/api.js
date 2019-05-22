var api = {
	getCoupons: function (filterCategories, onlyActive, limit) {
		var url = "/api/coupons?";
		if (filterCategories !== undefined)
			url += "filterCategories=" + encodeURIComponent(JSON.stringify(filterCategories)) + "&";
		if (onlyActive !== undefined)
			url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
		if (limit !== undefined)
			url += "limit=" + encodeURIComponent(limit) + "&";
		return fetch(url).then(function(response) { return response.json(); });
	}
};