# Würger King

An unofficial free and open source cross-platform proxy server & web UI for the Burger King app in Czech Republic, Germany, Netherlands, Austria, Switzerland, Finland, Sweden and Bulgaria.

This app can be used on old smartphones and unsupported operating systems and offers near full functionality for promotions and coupons.

The app is not affiliated with Burger King in any way and usage is not allowed in any way not allowed by the terms of the Burger King (Germany) app.

It is designed to be fast and lightweight and only required a browser to function.

This project is heavily inspired by [Slurger](https://github.com/max1220/slurger4) and builds on top of their previous work.

The web-facing part is licensed GPLv3. Server and other parts are licensed under the MIT license. See [LICENSE.md](LICENSE.md) for more information.

Extra features:

- more pretty coupons page: there will almost never be any gaps between coupons, no matter how you sort
- more coupon filters (view historical coupons)
- shows coupon count

Planned/TODO:

- basket mode for quickly scanning multiple coupons
- coupon search
- product list
- offline API emulation (service worker)
- show products in promotions
- web view tile
- king finder tile
- delivery tile
- link tile
- ingredient list
- allergen list

## Running

There is an existing online instance deployed on [https://wurgerking.wfr.moe/](https://wurgerking.wfr.moe/).

To build from source and run it yourself, first install MongoDB and a [D compiler](https://dlang.org).

First start mongodb, then run

```
dub
```

to build & run the app. You can access it on `http://127.0.0.1:3000` (accessible over local network) afterwards.

To not be accessible over the local network, change the `bindAddresses` occurence in `source/app.d` to `["::1", "127.0.0.1"]`

## Updates

If you are on commit cf69782 or before you should run
```
use wurgerking
db.coupons.update({}, {$set:{_region:"de/de"}}, false, true)
db.promos.update({}, {$set:{_region:"de/de"}}, false, true)
db.flags_.update({}, {$set:{_region:"de/de"}}, false, true)
db.flags_allergens.update({}, {$set:{_region:"de/de"}}, false, true)
db.flags_ingredients.update({}, {$set:{_region:"de/de"}}, false, true)
db.flags_productCategories.update({}, {$set:{_region:"de/de"}}, false, true)
db.flags_storeCategories.update({}, {$set:{_region:"de/de"}}, false, true)
db.promos.dropIndex("id_1")
db.coupons.dropIndex("id_1")
```
in your mongodb database to update old entries. Otherwise all old data will be ignored and new data identical will be cached.

---

This app is not affiliated with Burger King, Burger King Deutschland GmbH or any other third parties.

It is solely made as a project to research web app design based on a real usecase with the goal of offering wider availability for the app to older smartphones and devices with unsupported operating systems.

API usage is in no way officially recognized and is only used very sparsely to offer minimum functionality and it tries to use as few resources as possible to not cause any more weight than a normal user.
