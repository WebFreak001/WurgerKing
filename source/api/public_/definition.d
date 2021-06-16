module api.public_.definition;

import api.v2.promos;
import api.new_v2.coupons;

import vibe.data.json;

interface PublicAPI
{
	Coupon[][] getCoupons(string region, int[] filterCategories = null,
			bool onlyActive = true, bool hideExpired = false, int limit = 100,
			bool allGeo = false, int[] filterIds = null, bool mybk = false,
			bool compactRows = false, bool showPromo = true) @safe;
	Promo[] getPromos(string region, string filterStore = null, bool onlyActive = true, int limit = 100) @safe;
	Json[][string] getFlags(string region, string[] flags, bool onlyActive = true);
}
