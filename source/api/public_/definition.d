module api.public_.definition;

import api.v2.promos;
import api.v4.coupons;

import vibe.data.json;

interface PublicAPI
{
	Coupon[][] getCoupons(int[] filterCategories = null, bool onlyActive = true,
			bool hideExpired = false, int limit = 100, bool allGeo = false,
			int[] filterIds = null, bool mybk = false) @safe;
	Promo[] getPromos(string filterStore = null, bool onlyActive = true, int limit = 100) @safe;
	Json[][string] getFlags(string[] flags, bool onlyActive = true);
}
