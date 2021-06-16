# New API

Introduced around 2021 - API URLs:

Old API still mostly works, just need new coupons endpoint.

- Tracking URLs:
	- Staging: https://sondheim.appboy.com/api/v3/
	- Production: https://sdk.iad-01.braze.com/api/v3/

Coupons: https://mo.burgerking-app.eu/api/v2/coupons

Austrian coupons are still served through https://api.burgerking.de/api/{token}/v4/at/de/coupons/
# Old API

https://api.burgerking.de/api/{token}/v4/de/de/coupons/

https://api.burgerking.de/api/{token}/v2/de/de/meta

https://api.burgerking.de/api/{token}/v2/de/de/flags/

https://api.burgerking.de/api/{token}/v2/de/de/contents/

https://api.burgerking.de/api/{token}/v2/de/de/products/

https://api.burgerking.de/api/{token}/v2/de/de/stores/

https://api.burgerking.de/api/{token}/v2/de/de/promos/

https://api.burgerking.de/api/{token}/v3/de/de/tiles/

https://api.burgerking.de/api/{token}/v2/de/de/prestitials/


to obtain the token, base64 decode bzJ1dnIKUGRVWQo1N0o1Vwp3WXM2Tgp0eloyS24KazdUbgpBVVk= and join all lines

where de/de can also be:

- cz/cs
- de/de
- nl/nl
- at/de
- ch/de
- ch/fr
- ch/it
- fi/fi
- se/sv
- bg/bg

some don't have barcodes

