self.addEventListener('install', function (event) {
	if (navigator.onLine && event.skipWaiting) {
		event.skipWaiting();
	}

	event.waitUntil(
		caches.open('v2.8').then(function (cache) {
			return cache.addAll([
				'/',
				'/manifest.json',
				'/fonts/materialdesignicons-webfont.eot',
				'/fonts/materialdesignicons-webfont.svg',
				'/fonts/materialdesignicons-webfont.ttf',
				'/fonts/materialdesignicons-webfont.woff',
				'/fonts/materialdesignicons-webfont.woff2',
				'/css/materialdesignicons.min.css',
				'/css/slurger.css',
				'/js/api.js',
				'/js/qr.min.js',
				'/js/slurger.js',
				'/img/flag_de.png',
				'/img/info.png',
				'/img/kingfinder.png',
				'/img/profile.png',
				'/img/subtitle_coupons.png'
			]);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (resp) {
			return resp || fetch(event.request).then(function (response) {
				if (event.request.url.startsWith("/cache")) {
					return caches.open("v1").then(function (cache) {
						cache.put(event.request, response.clone());
						return response;
					});
				} else {
					return response;
				}
			});
		})
	);
});
