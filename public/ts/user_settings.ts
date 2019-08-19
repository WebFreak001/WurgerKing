///<reference path="commons.ts" />

let autoNavigate = false;

function getUsername(): string {
	return window.localStorage.getItem("username") || "Jan";
}

function updateUsernames(): void {
	let usernames = document.querySelectorAll(".username");
	let hellos = document.querySelectorAll(".hello");
	let name = getUsername();
	for (let i = 0; i < usernames.length; i++) {
		usernames[i].textContent = name;
	}
	let hello = translate(translations.hello, name);
	for (let i = 0; i < hellos.length; i++) {
		hellos[i].textContent = hello;
	}
}

function changeUsername(): void {
	let newName = prompt(translations.ex_name_prompt, getUsername());
	if (!newName)
		return;
	window.localStorage.setItem("username", newName);
	updateUsernames();
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
		.then(function (reg) {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope);
			reg.update();
		}).catch(function (error) {
			// registration failed
			console.log('Registration failed with ' + error);
		});
}

window.addEventListener('popstate', function () {
	pages.back(true);
});

let _didLoad = false;
function _loadCB() {
	if (_didLoad)
		return;
	_didLoad = true;
	pages.onLoad();
}
try { document.addEventListener("DOMContentLoaded", _loadCB, false); } catch (e) { console.error("failed attaching load event", e); }
try { window.addEventListener("load", _loadCB, false); } catch (e) { console.error("failed attaching load event", e); }
try { (<any>document).attachEvent("onreadystatechange", _loadCB, false); } catch (e) { }

if (autoNavigate)
	window.onload = function () { pages.openCoupons() };

window.addEventListener("beforeinstallprompt", function (e: any) {
	const banner = document.createElement("div");
	banner.style.position = "fixed";
	banner.style.left = "0";
	banner.style.top = "0";
	banner.style.width = "100%";
	banner.style.height = "32px";
	banner.style.zIndex = "100000";
	banner.style.backgroundColor = "#ffffff";

	const install = document.createElement("button");
	install.textContent = translations.ex_add_to_homescreen;
	install.onclick = function () {
		e.prompt();
		if (banner.parentElement) banner.parentElement.removeChild(banner);
	};
	banner.appendChild(install);

	const cancel = document.createElement("button");
	cancel.textContent = translations.ex_add_to_homescreen_cancel;
	cancel.onclick = function () {
		if (banner.parentElement) banner.parentElement.removeChild(banner);
	};
	banner.appendChild(cancel);

	document.body.appendChild(banner);
});

querySelectorOrThrow(".home footer .refresh", true).addEventListener("click", function () {
	window.location.reload();
});

// https://stackoverflow.com/a/4795914/2104229
function translate(...args: any[]): string {
	const string = args[0];
	if (typeof string != "string")
		return string;

	let i = 1;
	return string.replace(/%((%)|s|d)/g, function (m) {
		// m is the matched format, e.g. %s, %d
		let val = null;
		if (m[2]) {
			val = m[2];
		} else {
			val = args[i];
			// A switch statement so that the formatter can be extended. Default is %s
			switch (m) {
				case '%d':
					val = parseFloat(val);
					if (isNaN(val)) {
						val = 0;
					}
					break;
			}
			i++;
		}
		return val;
	});
}

if (window.location.hash)
	window.location.hash = "";

if (!window.location.pathname || window.location.pathname == "/") {
	const targetLanguage = window.localStorage.getItem("language");
	if (targetLanguage && language && targetLanguage != language)
		window.location.href = "/" + targetLanguage;
}
