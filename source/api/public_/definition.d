module api.public_.definition;

import api.v2.promos;
import api.v4.coupons;

interface PublicAPI
{
	Coupon[][] getCoupons(int[] filterCategories = null, bool onlyActive = true,
			int limit = 100, bool allGeo = false, int[] filterIds = null) @safe;
	Promo[] getPromos(string filterStore = null, bool onlyActive = true, int limit = 100) @safe;
}
