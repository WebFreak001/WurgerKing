"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var api = {
    getCoupons: function (filterCategories, onlyActive, limit, allGeo, filterIds, mybk, compactRows, showPromo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/coupons?";
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
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    getPromos: function (filterStore, onlyActive, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/promos?";
                        if (filterStore !== undefined)
                            url += "filterStore=" + encodeURIComponent(filterStore) + "&";
                        if (onlyActive !== undefined)
                            url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
                        if (limit !== undefined)
                            url += "limit=" + encodeURIComponent(limit) + "&";
                        url += "region=" + encodeURIComponent(region);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    getFlags: function (flags, onlyActive) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/flags?flags=" + encodeURIComponent(JSON.stringify(flags)) + "&";
                        if (onlyActive !== undefined)
                            url += "onlyActive=" + encodeURIComponent(onlyActive ? "true" : "false") + "&";
                        url += "region=" + encodeURIComponent(region);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
};
function querySelectorOrThrow(selector, message) {
    if (message === void 0) { message = false; }
    var ret = ((typeof this == "object" && this instanceof Element) ? this : document).querySelector(selector);
    if (ret === null) {
        if (message)
            alert("Failed finding element " + selector);
        throw new Error("Failed finding element " + selector);
    }
    else {
        return ret;
    }
}
Element.prototype.querySelectorOrThrow = querySelectorOrThrow;
// HTML parser & sanitizer
function insertHTMLInto(htmlText, elem) {
    var footnote = new DOMParser().parseFromString(htmlText, "text/html").body;
    function filterHTMLElement(elem) {
        var tag = "";
        if (!elem)
            return undefined;
        if (elem.nodeType == Node.TEXT_NODE) {
            if (elem.textContent)
                return document.createTextNode(elem.textContent);
            else
                return undefined;
        }
        else if (elem.nodeType == Node.ELEMENT_NODE && elem instanceof Element) {
            if (["SMALL", "P", "DIV", "A"].indexOf(elem.tagName) != -1) {
                tag = elem.tagName;
            }
            else {
                if (elem.textContent)
                    return document.createTextNode(elem.textContent);
                else
                    return undefined;
            }
            var ret = document.createElement(tag);
            var allowedAttrs = {
                A: ["href", "tabindex"]
            };
            var attrs = allowedAttrs[tag];
            if (attrs) {
                for (var i_1 = 0; i_1 < attrs.length; i_1++) {
                    var attr = elem.getAttribute(attrs[i_1]);
                    if (attr !== null)
                        ret.setAttribute(attrs[i_1], attr);
                }
            }
            if (tag == "A") {
                ret.setAttribute("target", "_blank");
            }
            var val_1;
            for (var i_2 = 0; i_2 < elem.childNodes.length; i_2++) {
                if (val_1 = filterHTMLElement(elem.childNodes[i_2]))
                    ret.appendChild(val_1);
            }
            return ret;
        }
        else {
            return undefined;
        }
    }
    var val;
    for (var i_3 = 0; i_3 < footnote.children.length; i_3++)
        if (val = filterHTMLElement(footnote.childNodes[i_3]))
            elem.appendChild(val);
}
///<reference path="commons.ts" />
var BottomBar = /** @class */ (function () {
    function BottomBar(element) {
        this.element = element;
        this.actionsContainer = querySelectorOrThrow(".right", true);
        element.querySelectorOrThrow(".close", true).addEventListener("click", function () {
            pages.back();
        });
    }
    BottomBar.prototype.show = function (actions) {
        this.element.classList.remove("hidden");
        while (this.actionsContainer.lastChild)
            this.actionsContainer.removeChild(this.actionsContainer.lastChild);
        if (Array.isArray(actions)) {
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                var elem;
                if (typeof action.icon == "string" && action.icon.endsWith(".svg")) {
                    elem = document.createElement("img");
                    elem.src = action.icon;
                }
                else if (typeof action.element == "object") {
                    elem = action.element;
                }
                else {
                    console.error("Ignoring unsupported action ", action);
                    continue;
                }
                var btn = document.createElement("div");
                btn.className = "action" + (typeof action.icon == "string" ? " icon" : "");
                btn.appendChild(elem);
                if (action.callback)
                    btn.addEventListener("click", action.callback);
                if (action.onCreate)
                    action.onCreate(btn);
                this.actionsContainer.appendChild(btn);
            }
        }
    };
    BottomBar.prototype.hide = function () {
        this.element.classList.add("hidden");
    };
    return BottomBar;
}());
var bottomBar = new BottomBar(document.querySelector(".bottombar") || document.createElement("div"));
var likes = {
    data: null,
    load: function () {
        var str = window.localStorage.getItem("likes");
        if (str && str[0] == '{')
            this.data = JSON.parse(str);
        else
            this.data = {};
    },
    save: function () {
        window.localStorage.setItem("likes", JSON.stringify(this.data));
    },
    check: function (id) {
        id = id.toString();
        if (this.data == null)
            this.load();
        return !!this.data[id];
    },
    toggle: function (id) {
        id = id.toString();
        var val = !this.check(id);
        this.set(id, val);
        return val;
    },
    set: function (id, liked) {
        id = id.toString();
        if (this.data == null)
            this.load();
        this.data[id] = liked;
        this.save();
    },
    getIds: function () {
        if (this.data == null)
            this.load();
        var ids = [];
        for (var key in this.data) {
            if (this.data.hasOwnProperty(key) && this.data[key]) {
                ids.push(parseInt(key));
            }
        }
        return ids;
    }
};
var meta = {
    data: null,
    required: ["productCategories"],
    getData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.data) return [3 /*break*/, 1];
                        return [2 /*return*/, this.data];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, api.getFlags(this.required)];
                    case 2: return [2 /*return*/, _a.data = _b.sent()];
                }
            });
        });
    },
    /**
     * @returns {Promise<{ id: number, image: { url: string }, title: string, color: string, icon: { url: string } }[]>}
     */
    getProductCategories: function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        // duplicate data
                        return [2 /*return*/, JSON.parse(JSON.stringify(data["productCategories"]))];
                }
            });
        });
    }
};
///<reference path="commons.ts" />
var ignoredPromos = [
    11087 // multi language update
];
function clickTile(tile) {
    var type = tile.getAttribute("data-type");
    console.log("click " + type);
    switch (type) {
        case "menuPromo":
            break;
        case "menuCoupon":
            pages.openCoupons(tile);
            break;
        case "menuDelivery":
            pages.openDelivery(tile);
            break;
        case "menuKingfinder":
            pages.openKingfinder(tile);
            break;
        case "menuProduct":
            pages.openProducts(tile);
            break;
        case "menuMybk":
            pages.openMybk(tile);
            break;
        case "menuGeneric":
            pages.openGeneric(tile);
            break;
        default:
            console.error("Unrecognized tile link type: " + type);
            return;
    }
}
var tiles = document.querySelectorAll(".tile");
for (var i = 0; i < tiles.length; i++)
    tiles[i].addEventListener("click", function () {
        clickTile(this);
    });
///<reference path="commons.ts" />
var autoNavigate = false;
function getUsername() {
    return window.localStorage.getItem("username") || "Jan";
}
function updateUsernames() {
    var usernames = document.querySelectorAll(".username");
    var hellos = document.querySelectorAll(".hello");
    var name = getUsername();
    for (var i_4 = 0; i_4 < usernames.length; i_4++) {
        usernames[i_4].textContent = name;
    }
    var hello = translate(translations.hello, name);
    for (var i_5 = 0; i_5 < hellos.length; i_5++) {
        hellos[i_5].textContent = hello;
    }
}
function changeUsername() {
    var newName = prompt(translations.ex_name_prompt, getUsername());
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
    })["catch"](function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}
window.addEventListener('popstate', function () {
    pages.back(true);
});
var _didLoad = false;
function _loadCB() {
    if (_didLoad)
        return;
    _didLoad = true;
    pages.onLoad();
}
try {
    document.addEventListener("DOMContentLoaded", _loadCB, false);
}
catch (e) {
    console.error("failed attaching load event", e);
}
try {
    window.addEventListener("load", _loadCB, false);
}
catch (e) {
    console.error("failed attaching load event", e);
}
try {
    document.attachEvent("onreadystatechange", _loadCB, false);
}
catch (e) { }
if (autoNavigate)
    window.onload = function () { pages.openCoupons(); };
window.addEventListener("beforeinstallprompt", function (e) {
    var banner = document.createElement("div");
    banner.style.position = "fixed";
    banner.style.left = "0";
    banner.style.top = "0";
    banner.style.width = "100%";
    banner.style.height = "32px";
    banner.style.zIndex = "100000";
    banner.style.backgroundColor = "#ffffff";
    var install = document.createElement("button");
    install.textContent = translations.ex_add_to_homescreen;
    install.onclick = function () {
        e.prompt();
        if (banner.parentElement)
            banner.parentElement.removeChild(banner);
    };
    banner.appendChild(install);
    var cancel = document.createElement("button");
    cancel.textContent = translations.ex_add_to_homescreen_cancel;
    cancel.onclick = function () {
        if (banner.parentElement)
            banner.parentElement.removeChild(banner);
    };
    banner.appendChild(cancel);
    document.body.appendChild(banner);
});
querySelectorOrThrow(".home footer .refresh", true).addEventListener("click", function () {
    window.location.reload();
});
// https://stackoverflow.com/a/4795914/2104229
function translate() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var string = args[0];
    if (typeof string != "string")
        return string;
    var i = 1;
    return string.replace(/%((%)|s|d)/g, function (m) {
        // m is the matched format, e.g. %s, %d
        var val = null;
        if (m[2]) {
            val = m[2];
        }
        else {
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
    var targetLanguage = window.localStorage.getItem("language");
    if (targetLanguage && language && targetLanguage != language)
        window.location.href = "/" + targetLanguage;
}
///<reference path="../commons.ts" />
var Pages = /** @class */ (function () {
    function Pages() {
        this.stack = [];
    }
    Pages.prototype.openBlankGeneric = function (name, tile, withBottomBar, animationDone, actions) {
        var div = document.createElement("div");
        this.stack.push({ div: div, withBottomBar: withBottomBar, actions: actions, name: name });
        window.history.pushState({ name: name }, "", "#" + name);
        var slash = name.lastIndexOf("/");
        var subname = slash == -1 ? "" : (" " + name.substr(0, slash + 1).replace(/[^a-zA-Z0-9]/g, "_") + "arg");
        div.className = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_") + subname + " subpage loading" + (withBottomBar ? " bottomless" : "");
        var rect = tile ? tile.getBoundingClientRect() : { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50, width: 100, height: 100 };
        div.style.left = (rect.x || 0) + "px";
        div.style.top = (rect.y || 0) + "px";
        div.style.width = rect.width + "px";
        div.style.height = rect.height + "px";
        document.body.appendChild(div);
        pages.cancelAnimation = function () {
            document.body.removeChild(div);
        };
        pages.animation = setTimeout(function () {
            div.classList.add("animating");
            pages.animation = setTimeout(function () {
                div.classList.remove("animating");
                div.classList.remove("loading");
                div.style.left = "";
                div.style.top = "";
                div.style.width = "";
                div.style.height = "";
                var subPages = document.querySelectorAll(".subpage");
                for (var i_6 = 0; i_6 < subPages.length; i_6++)
                    if (subPages[i_6] != div)
                        subPages[i_6].style.display = "none";
                querySelectorOrThrow(".home", true).style.display = "none";
                pages.cancelAnimation = undefined;
                if (animationDone)
                    animationDone();
            }, 300);
        }, 10);
        if (withBottomBar)
            bottomBar.show(actions);
        return div;
    };
    Pages.prototype.openTitledGeneric = function (name, tile, title, withBottomBar, animationDone, titleAnimationDone, actions) {
        var titleDiv = document.createElement("div");
        titleDiv.className = "title branded loading";
        titleDiv.textContent = title;
        var content = document.createElement("div");
        content.className = "content";
        var div = this.openBlankGeneric(name, tile, withBottomBar, function () {
            titleDiv.classList.add("animating");
            pages.animation = setTimeout(function () {
                titleDiv.classList.remove("animating");
                titleDiv.classList.remove("loading");
                if (titleAnimationDone)
                    titleAnimationDone();
            }, 200);
            if (animationDone)
                animationDone();
        }, actions);
        div.classList.add("titled");
        div.appendChild(titleDiv);
        div.appendChild(content);
        return content;
    };
    Pages.prototype.back = function (noHistory) {
        var page = this.stack.pop();
        if (page && !noHistory && window.history.state && window.history.state.name == page.name) {
            this.stack.push(page);
            return window.history.back();
        }
        clearTimeout(pages.animation);
        if (pages.cancelAnimation)
            pages.cancelAnimation();
        if (page) {
            document.body.removeChild(page.div);
        }
        if (this.stack.length == 0) {
            this.home();
        }
        else {
            var current = this.stack[this.stack.length - 1];
            var subPages = document.querySelectorAll(".subpage");
            for (var i_7 = 0; i_7 < subPages.length; i_7++)
                subPages[i_7].style.display = subPages[i_7] == current.div ? "" : "none";
            if (current.withBottomBar)
                bottomBar.show(current.actions);
        }
    };
    Pages.prototype.home = function () {
        clearTimeout(pages.animation);
        if (pages.cancelAnimation)
            pages.cancelAnimation();
        querySelectorOrThrow(".home", true).style.display = "";
        var subPages = document.querySelectorAll(".subpage");
        for (var i = 0; i < subPages.length; i++) {
            var page = subPages[i];
            if (page && page.parentElement)
                page.parentElement.removeChild(page);
        }
        bottomBar.hide();
    };
    Pages.prototype.onLoad = function () {
        var promos = document.querySelector('[data-type="menuPromo"]');
        if (promos) {
            var carousel = document.createElement("div");
            carousel.className = "promolist carousel";
            promos.appendChild(carousel);
            var data = promos.getAttribute("data-json");
            if (data) {
                var items = JSON.parse(data).promos;
                for (var i_8 = 0; items && i_8 < items.length; i_8++) {
                    if (items[i_8].promoId && ignoredPromos.indexOf(items[i_8].promoId) != -1)
                        continue;
                    var promo = document.createElement("div");
                    promo.setAttribute("data-json", JSON.stringify(items[i_8]));
                    promo.className = "carousel-cell promo";
                    insertImages(promo, items[i_8].images, "data-flickity-lazyload");
                    carousel.appendChild(promo);
                }
                var flkty = new Flickity(carousel, {
                    lazyLoad: 1,
                    prevNextButtons: false,
                    wrapAround: true
                });
                flkty.on("staticClick", pages.onClickPromo);
            }
        }
        updateUsernames();
        querySelectorOrThrow(".home > header", true).addEventListener("dblclick", changeUsername);
        querySelectorOrThrow(".home > footer > .flag", true).addEventListener("click", pages.changeLanguage);
    };
    Pages.prototype.openDelivery = function (tile) { };
    Pages.prototype.openKingfinder = function (tile) { };
    Pages.prototype.openProducts = function (tile) { };
    Pages.prototype.openMybk = function (tile) { };
    Pages.prototype.openGeneric = function (tile) { };
    Pages.prototype.changeLanguage = function () {
        var div = pages.openTitledGeneric("countrysel", undefined, translations.page_country, true, undefined, function () {
            var title = div.parentElement.querySelectorOrThrow(".title", true);
            var subtitle = document.createElement("p");
            subtitle.textContent = translations.page_country_subtitle;
            title.appendChild(subtitle);
            var itemsContainer = document.createElement("div");
            itemsContainer.className = "items";
            div.appendChild(itemsContainer);
            for (var i_9 = 0; i_9 < availableLanguages.length; i_9++) {
                var lang = availableLanguages[i_9];
                var item = createFilterItem(".flag.flag-" + lang.id.substr(3, 2).toLowerCase(), lang.name, lang.id == language, function (active) {
                    if (!active)
                        return false;
                    var id = this.getAttribute("data");
                    console.log("selected language " + id);
                    if (id == null)
                        return false;
                    window.localStorage.setItem("language", id);
                    window.location.href = "/" + id;
                });
                item.setAttribute("data", lang.id);
                itemsContainer.appendChild(item);
            }
            itemsContainer.appendChild(createFilterItem(undefined, "Reset (Browser Language)", false, function () {
                window.localStorage.removeItem("language");
                window.location.href = "/";
            }));
        });
    };
    return Pages;
}());
var pages = new Pages();
function createFilterItem(imgUrl, label, initial, onToggle) {
    var item = document.createElement("div");
    item.className = "item";
    if (typeof imgUrl == "string" && imgUrl.startsWith(".")) {
        var img = document.createElement("div");
        img.className = "icon" + imgUrl.replace(/\./g, " ");
        item.appendChild(img);
    }
    else if (typeof imgUrl == "string") {
        var img = document.createElement("img");
        img.src = imgUrl;
        item.appendChild(img);
    }
    var text = document.createElement("span");
    text.className = "title";
    text.textContent = label;
    item.appendChild(text);
    var check = document.createElement("i");
    check.className = "checkbox mdi mdi-check";
    check.style.display = initial ? "" : "none";
    item.appendChild(check);
    function toggleDisplay(active) {
        check.style.display = active ? "" : "none";
    }
    item.onclick = function () {
        var active = check.style.display != "none";
        active = !active;
        toggleDisplay(active);
        if (onToggle.call(item, active) === false) {
            toggleDisplay(!active);
        }
    };
    return item;
}
///<reference path="pages.ts" />
///<reference path="../commons.ts" />
Pages.prototype.openCoupons = function (tile) {
    var subtitle = new Image();
    subtitle.src = "/img/subtitle_coupons_" + translations.asset_language + ".png";
    var compressTiles = false;
    var showInactive = false;
    var showPromo = true;
    var filterLikes = false;
    var mybk = false;
    var filterCategories = [];
    var filterBtn = undefined;
    var backdrop = document.createElement("div");
    backdrop.className = "filter-backdrop";
    backdrop.style.display = "none";
    var settings = document.createElement("div");
    settings.className = "filter-settings";
    settings.style.display = "none";
    settings.classList.add("hidden");
    var header = document.createElement("div");
    header.className = "header";
    var title = document.createElement("h4");
    title.textContent = translations.filter_title;
    header.appendChild(title);
    var resetButton = document.createElement("div");
    resetButton.className = "reset";
    resetButton.textContent = translations.reset_filter;
    header.appendChild(resetButton);
    var filler = document.createElement("div");
    filler.className = "filler";
    header.appendChild(filler);
    var applyButton = document.createElement("div");
    applyButton.className = "apply";
    applyButton.textContent = translations.apply_filter;
    header.appendChild(applyButton);
    settings.appendChild(header);
    var itemsContainer = document.createElement("div");
    itemsContainer.className = "items";
    settings.appendChild(itemsContainer);
    var items = document.createElement("div");
    items.className = "filters";
    itemsContainer.appendChild(items);
    function refreshItems() {
        pages.updateCoupons(div, items, refreshItems, filterCategories, !showInactive, filterLikes, mybk, compressTiles, showPromo).then(function (data) {
            if (!filterBtn)
                return;
            var badge = filterBtn.querySelector(".badge");
            if (!badge) {
                badge = document.createElement("div");
                badge.className = "badge";
                filterBtn.appendChild(badge);
            }
            badge.textContent = data.count.toString();
        });
        var changed = showInactive || filterCategories.length > 0;
        if (filterBtn && filterBtn.children[0].tagName == "IMG")
            filterBtn.children[0].src = changed ? "/img/icons/filter_filled.svg" : "/img/icons/filter.svg";
        else if (filterBtn)
            console.error("Expected ", filterBtn.children[0], " to be an image");
        resetButton.style.display = changed ? "" : "none";
    }
    function openFilters() {
        backdrop.style.display = "block";
        settings.style.display = "block";
        settings.classList.add("hidden");
        setTimeout(function () {
            settings.classList.remove("hidden");
        }, 30);
    }
    function closeFilters() {
        backdrop.style.display = "none";
        settings.classList.add("hidden");
        setTimeout(function () {
            settings.style.display = "none";
        }, 100);
    }
    function toggleFilters() {
        if (backdrop.style.display == "none") {
            openFilters();
        }
        else {
            closeFilters();
        }
    }
    resetButton.onclick = function () {
        showInactive = false;
        filterCategories.splice(0, filterCategories.length);
        refreshItems();
        closeFilters();
    };
    applyButton.onclick = closeFilters;
    var inactiveToggle = createFilterItem(undefined, translations.ex_filter_inactive, showInactive, function (active) {
        showInactive = active;
        refreshItems();
    });
    itemsContainer.appendChild(inactiveToggle);
    var promoToggle = createFilterItem(undefined, translations.ex_filter_promo, showPromo, function (active) {
        showPromo = active;
        refreshItems();
    });
    itemsContainer.appendChild(promoToggle);
    var div = this.openTitledGeneric("coupons", tile, translations.page_coupons, true, undefined, function () {
        var title = div.parentElement.querySelectorOrThrow(".title", true);
        var img = document.createElement("img");
        img.classList.add("subtitle");
        img.style.marginBottom = "-" + parseFloat(translations.subtitle_offset || "0") * 0.3 + "px";
        img.src = subtitle.src;
        title.appendChild(img);
        div.parentElement.appendChild(backdrop);
        div.parentElement.appendChild(settings);
    }, [
        {
            icon: "/img/icons/mybk.svg",
            callback: function (e) {
                mybk = !mybk;
                if (this.children[0].tagName == "IMG")
                    this.children[0].src = mybk ? "/img/icons/mybk_filled.svg" : "/img/icons/mybk.svg";
                else
                    console.error("Expected ", this.children[0], " to be an image!");
                refreshItems();
            }
        },
        {
            icon: "/img/icons/heart.svg",
            callback: function (e) {
                filterLikes = !filterLikes;
                if (this.children[0].tagName == "IMG")
                    this.children[0].src = filterLikes ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
                else
                    console.error("Expected ", this.children[0], " to be an image!");
                refreshItems();
            }
        },
        {
            icon: "/img/icons/search.svg",
            callback: function (e) {
            }
        },
        {
            icon: "/img/icons/filter.svg",
            onCreate: function (elem) {
                filterBtn = elem;
            },
            callback: function () {
                filterBtn = this;
                toggleFilters();
            }
        }
    ]);
    div.classList.add("grid");
    refreshItems();
};
Pages.prototype.onClickCoupon = function (event) {
    var dataStr = this.parentElement ? this.parentElement.getAttribute("data") : undefined;
    if (!dataStr)
        return;
    var data = JSON.parse(dataStr);
    console.log(data);
    var div = pages.openBlankGeneric("coupons/" + data.id, this.parentElement, true, function () {
        var container = document.createElement("div");
        container.className = "content";
        div.appendChild(container);
        var tile = document.createElement("div");
        tile.className = "bigtile";
        var content = renderCouponTile(tile, data);
        content.classList.add("bigbranded");
        container.appendChild(tile);
        var qr = document.createElement("div");
        qr.className = "qrcode";
        qr.style.display = "none";
        qr.style.opacity = "0";
        var flag = document.createElement("div");
        flag.className = "flag flag-" + region.substr(0, 2);
        qr.appendChild(flag);
        var topLabel = document.createElement("p");
        topLabel.className = "toplabel";
        topLabel.textContent = translations.coupon_top_title;
        qr.appendChild(topLabel);
        var code = document.createElement("div");
        code.className = "code";
        var canvas = document.createElement("canvas");
        var context;
        code.appendChild(canvas);
        var startFrame, endFrame;
        var modeIndex = 0;
        var barcode;
        var bitmap;
        var bits = [];
        var dpr = window.devicePixelRatio || 1;
        var canvasWidth, canvasHeight;
        var lastFrame = performance.now();
        for (var i_10 = data.barcodes.length - 1; i_10 >= 0; i_10--) {
            console.log(data.barcodes[i_10]);
            if (!data.barcodes[i_10].value)
                data.barcodes.splice(i_10, 1);
            else if (data.barcodes[i_10].type == "QR")
                modeIndex = i_10;
        }
        if (data.myBkOnetime || !data.barcodes.length)
            data.barcodes.push({
                "type": "label",
                "value": data.plu
            });
        function reinitCanvas() {
            var rect = qr.getBoundingClientRect();
            var self = code.getBoundingClientRect();
            canvas.style.width = "100%";
            canvasWidth = rect.width;
            canvasHeight = rect.height - (self.top - rect.top) * 2 - 40; // top = bottom space - label height
            canvas.width = canvasWidth * dpr;
            canvas.height = canvasHeight * dpr;
            startFrame = 0;
            endFrame = 0.15;
            barcode = data.barcodes[modeIndex];
            context = canvas.getContext("2d");
            if (context == null) {
                throw new Error("Canvas API not supported");
            }
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            var mode = barcode.type;
            if (mode == "QR") {
                bitmap = document.createElement("canvas");
                bitmap.width = bitmap.height = 21 * 16;
                new QRious({
                    element: bitmap,
                    value: barcode.value,
                    size: bitmap.width,
                    backgroundAlpha: 0,
                    foreground: "#682f1c",
                    level: "L" // L, M, Q, H
                });
            }
            else if (mode == "EAN-13") {
                var v = barcode.value;
                if (v.length == 13) {
                    bits = [];
                    bits.push(1, 0, 1);
                    var pattern = [
                        "LLLLLL",
                        "LLGLGG",
                        "LLGGLG",
                        "LLGGGL",
                        "LGLLGG",
                        "LGGLLG",
                        "LGGGLL",
                        "LGLGLG",
                        "LGLGGL",
                        "LGGLGL"
                    ][parseInt(v[0])];
                    var codes = {
                        L: [
                            [0, 0, 0, 1, 1, 0, 1],
                            [0, 0, 1, 1, 0, 0, 1],
                            [0, 0, 1, 0, 0, 1, 1],
                            [0, 1, 1, 1, 1, 0, 1],
                            [0, 1, 0, 0, 0, 1, 1],
                            [0, 1, 1, 0, 0, 0, 1],
                            [0, 1, 0, 1, 1, 1, 1],
                            [0, 1, 1, 1, 0, 1, 1],
                            [0, 1, 1, 0, 1, 1, 1],
                            [0, 0, 0, 1, 0, 1, 1]
                        ],
                        G: [
                            [0, 1, 0, 0, 1, 1, 1],
                            [0, 1, 1, 0, 0, 1, 1],
                            [0, 0, 1, 1, 0, 1, 1],
                            [0, 1, 0, 0, 0, 0, 1],
                            [0, 0, 1, 1, 1, 0, 1],
                            [0, 1, 1, 1, 0, 0, 1],
                            [0, 0, 0, 0, 1, 0, 1],
                            [0, 0, 1, 0, 0, 0, 1],
                            [0, 0, 0, 1, 0, 0, 1],
                            [0, 0, 1, 0, 1, 1, 1]
                        ],
                        R: [
                            [1, 1, 1, 0, 0, 1, 0],
                            [1, 1, 0, 0, 1, 1, 0],
                            [1, 1, 0, 1, 1, 0, 0],
                            [1, 0, 0, 0, 0, 1, 0],
                            [1, 0, 1, 1, 1, 0, 0],
                            [1, 0, 0, 1, 1, 1, 0],
                            [1, 0, 1, 0, 0, 0, 0],
                            [1, 0, 0, 0, 1, 0, 0],
                            [1, 0, 0, 1, 0, 0, 0],
                            [1, 1, 1, 0, 1, 0, 0]
                        ]
                    };
                    for (var i = 1; i < 7; i++) {
                        var c = codes[pattern[i - 1]][parseInt(v[i])];
                        bits.push.apply(bits, c);
                    }
                    bits.push(0, 1, 0, 1, 0);
                    for (var i = 7; i < 13; i++) {
                        var c = codes.R[parseInt(v[i])];
                        bits.push.apply(bits, c);
                    }
                    bits.push(1, 0, 1);
                }
                var step = Math.floor(1 / bits.length * canvas.width) / dpr;
                bitmap = document.createElement("canvas");
                bitmap.width = step * bits.length + 1;
                bitmap.height = 9 * canvasWidth / 50;
                var c2 = bitmap.getContext("2d");
                if (c2 == null)
                    throw new Error("Canvas API not supported");
                c2.beginPath();
                c2.fillStyle = "#682f1c";
                c2.translate(0.5, -0.5);
                for (var x = 0; x < bits.length; x++) {
                    if (bits[x] != 0)
                        c2.rect(x * step, 0, step, bitmap.height);
                    c2.fill();
                }
                c2.translate(0.5, 0.5);
            }
            lastFrame = performance.now();
        }
        function redraw() {
            if (!context)
                return;
            var now = performance.now();
            var delta = (now - lastFrame) / 16.0;
            lastFrame = now;
            var mode = barcode.type;
            function animatedRect(w, h) {
                if (!context)
                    return;
                var speed = w / 3000 * delta;
                if (startFrame <= 0.25 || (startFrame > 0.5 && startFrame <= 0.75))
                    startFrame += speed * h / w;
                else
                    startFrame += speed;
                startFrame = startFrame % 1;
                if (endFrame <= 0.25 || (endFrame > 0.5 && endFrame <= 0.75))
                    endFrame += speed * h / w;
                else
                    endFrame += speed;
                endFrame = endFrame % 1;
                var start = startFrame;
                var end = endFrame;
                if (end < start)
                    end++;
                var corners = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
                function mapPoint(time) {
                    while (time < 0)
                        time++;
                    time = time % 1;
                    if (time <= 0.25)
                        return [time * 4 * (w - 1) * s + 0.5 * s, 0.5 * s];
                    else if (time <= 0.5)
                        return [w * s - 0.5 * s, (time - 0.25) * 4 * (h - 1) * s + 0.5 * s];
                    else if (time <= 0.75)
                        return [(0.75 - time) * 4 * (w - 1) * s + 0.5 * s, h * s - 0.5 * s];
                    else
                        return [0.5 * s, (1 - time) * 4 * (h - 1) * s + 0.5 * s];
                }
                context.strokeStyle = "#69a82f";
                context.lineWidth = s;
                context.beginPath();
                var overCorners = [];
                for (var i_11 = 0; i_11 < corners.length; i_11++) {
                    if (start < corners[i_11] && end >= corners[i_11]) {
                        overCorners.push(corners[i_11]);
                    }
                }
                if (overCorners.length) {
                    var startPoint = mapPoint(start);
                    var endPoint = mapPoint(end);
                    context.moveTo(startPoint[0], startPoint[1]);
                    for (var i_12 = 0; i_12 < overCorners.length; i_12++) {
                        var overCorner = mapPoint(overCorners[i_12]);
                        context.lineTo(overCorner[0], overCorner[1]);
                    }
                    context.lineTo(endPoint[0], endPoint[1]);
                }
                else {
                    var startPoint = mapPoint(start);
                    var endPoint = mapPoint(end);
                    context.moveTo(startPoint[0], startPoint[1]);
                    context.lineTo(endPoint[0], endPoint[1]);
                }
                context.stroke();
                context.closePath();
                var ds = mode == "QR" ? 5 : 6;
                var de = mode == "QR" ? 12 : 14;
                var grad = context.createRadialGradient(0, 0, ds * s, 0, 0, de * s);
                context.beginPath();
                grad.addColorStop(0, "#fcf6f0ff");
                grad.addColorStop(1, "#fcf6f000");
                context.fillStyle = grad;
                context.fillRect(-s, -s, (de + 1) * s, (de + 1) * s);
                context.closePath();
                grad = context.createRadialGradient(w * s, h * s, ds * s, w * s, h * s, de * s);
                context.beginPath();
                grad.addColorStop(0, "#fcf6f0ff");
                grad.addColorStop(1, "#fcf6f000");
                context.fillStyle = grad;
                context.fillRect((w - de) * s, (h - de) * s, (de + 1) * s, (de + 1) * s);
                context.closePath();
            }
            context.clearRect(-100, -100, canvasWidth + 200, canvasHeight + 200);
            var s = mode == "QR" ? canvasHeight / 30 : canvasWidth / 50;
            context.resetTransform();
            context.scale(dpr, dpr);
            var w = mode == "QR" ? 30 : 40;
            var h = mode == "QR" ? 30 : 13;
            if (mode == "QR") {
                context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
                animatedRect(w, h);
                context.drawImage(bitmap, 3 * s, 3 * s, 24 * s, 24 * s);
            }
            else if (mode == "EAN-13") {
                var step = Math.floor(1 / bits.length * canvas.width) / dpr;
                w = (6 + step * bits.length / s);
                context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
                animatedRect(w, h);
                context.drawImage(bitmap, 3 * s, 2 * s - 1);
            }
            else {
                context.translate((canvasWidth - w * s) / 2, (canvasHeight - h * s) / 2);
                animatedRect(w, h);
                context.font = (h * (s - 4)) + "px 'Passion One', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillStyle = "#682f1c";
                context.fillText(barcode.value, w * s / 2, h * s / 2);
                context.fill();
            }
            if (requestAnimationFrame)
                requestAnimationFrame(redraw);
            else
                setTimeout(redraw, 16);
        }
        var codeLabel = document.createElement("div");
        codeLabel.textContent = data.plu;
        codeLabel.className = "label";
        if (data.myBkOnetime) {
            // TODO: countdown timer
        }
        else if (data.barcodes.length > 1)
            code.appendChild(codeLabel);
        qr.appendChild(code);
        var bottomLabel = document.createElement("p");
        bottomLabel.className = "bottomlabel";
        if (data.barcodes.length == 2
            && (data.barcodes[0].type == "QR" && data.barcodes[1].type == "EAN-13"
                || data.barcodes[0].type == "EAN-13" && data.barcodes[1].type == "QR")) {
            bottomLabel.textContent = data.barcodes[modeIndex].type == "QR" ? translations.switch_to_ean : translations.switch_to_qr;
        }
        else {
            bottomLabel.textContent = translations.switch_to_next;
        }
        console.log(data.barcodes);
        if (data.barcodes.length > 1)
            qr.appendChild(bottomLabel);
        bottomLabel.addEventListener("click", function () {
            modeIndex = (modeIndex + 1) % data.barcodes.length;
            if (data.barcodes.length == 2
                && (data.barcodes[0].type == "QR" && data.barcodes[1].type == "EAN-13"
                    || data.barcodes[0].type == "EAN-13" && data.barcodes[1].type == "QR")) {
                bottomLabel.textContent = data.barcodes[modeIndex].type == "QR" ? translations.switch_to_ean : translations.switch_to_qr;
            }
            else {
                bottomLabel.textContent = translations.switch_to_next;
            }
            reinitCanvas();
        });
        tile.appendChild(qr);
        var redeem = document.createElement("div");
        redeem.className = "redeembtn";
        redeem.textContent = translations.redeembtn;
        div.appendChild(redeem);
        redeem.addEventListener("click", function () {
            if (qr.style.display == "none") {
                qr.style.display = "";
                if (context)
                    context.clearRect(0, 0, canvasWidth, canvasHeight);
                context = null;
                setTimeout(function () {
                    qr.style.opacity = "1";
                    setTimeout(function () {
                        reinitCanvas();
                        redraw();
                    }, 300);
                }, 50);
                redeem.textContent = translations.redeembtn_close;
            }
            else {
                qr.style.opacity = "0";
                qr.style.display = "none";
                if (context)
                    context.clearRect(0, 0, canvasWidth, canvasHeight);
                context = null;
                redeem.textContent = translations.redeembtn;
            }
        });
        var infos = document.createElement("div");
        infos.className = "highlit-panel coupon-panel";
        var name = document.createElement("h3");
        name.textContent = data.title.replace(/®/g, ""); // the ® sign looks too weird, so we strip it out from the big title
        infos.appendChild(name);
        if (typeof data.description == "string" && data.description.length > 0) {
            var desc = document.createElement("p");
            desc.className = "description";
            desc.textContent = data.description;
            infos.appendChild(desc);
        }
        var price = document.createElement("p");
        price.className = "price";
        price.textContent = data.price;
        infos.appendChild(price);
        var extra = document.createElement("h4");
        extra.textContent = translations.coupon_restaurants;
        infos.appendChild(extra);
        container.appendChild(infos);
        var maps = document.createElement("img");
        maps.className = "fullmaps";
        maps.src = "/img/generic_maps.png";
        container.appendChild(maps);
        var details = document.createElement("div");
        details.className = "details htmlview";
        try {
            insertHTMLInto(data.footnote, details);
        }
        catch (e) {
            console.error("Error in footnote: ", data.footnote, e);
        }
        container.appendChild(details);
    }, [
        {
            icon: "/img/icons/share.svg",
            callback: function () {
                if (navigator.share) {
                    navigator.share({
                        text: translate(translations.share, data.title, data.price),
                        url: "burgerking://coupons/" + data.id
                    });
                }
            }
        }
    ]);
};
Pages.prototype.updateCoupons = function (div, settings, updateFilters, filterCategories, onlyActive, filterLikes, mybk, compressTiles, showPromo) {
    return __awaiter(this, void 0, void 0, function () {
        function computeRowWidth(row) {
            var total = 0;
            for (var i_13 = 0; i_13 < row.children.length; i_13++) {
                var w = row.children[i_13].getAttribute("width");
                if (w !== null)
                    total += parseInt(w);
            }
            return total;
        }
        var categories, couponClickHandler, rows, flattend, count, usedCategories, unfullRows, first, len, i_14, other, j, data, i_15, i_16, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    while (div.lastChild)
                        div.removeChild(div.lastChild);
                    categories = meta.getProductCategories();
                    couponClickHandler = this.onClickCoupon;
                    return [4 /*yield*/, api.getCoupons(undefined, onlyActive, undefined, undefined, filterLikes ? likes.getIds() : undefined, mybk, compressTiles, showPromo)];
                case 1:
                    rows = _a.sent();
                    flattend = [];
                    count = 0;
                    usedCategories = [];
                    unfullRows = [];
                    rows.forEach(function (row) {
                        var tr = document.createElement("div");
                        tr.className = "row";
                        div.appendChild(tr);
                        var _loop_1 = function (j) {
                            var cell = row[j];
                            var td = document.createElement("div");
                            td.className = "tile";
                            if (cell._active === false && cell.to) {
                                td.classList.add("inactive");
                                var expires = new Date(cell.to * 1000);
                                var now = new Date();
                                var diff = now.getTime() - expires.getTime();
                                if (diff > 30 * 24 * 60 * 60 * 1000)
                                    td.classList.add("old");
                            }
                            if (cell.hidden && !cell.secret)
                                return "continue";
                            if (cell.secret)
                                td.classList.add("secret");
                            var content = renderCouponTile(td, cell);
                            content.addEventListener("click", couponClickHandler);
                            if (autoNavigate) {
                                autoNavigate = false;
                                setTimeout(function () {
                                    content.click();
                                }, 400);
                            }
                            flattend.push(cell);
                            var anyUsed = false;
                            if (Array.isArray(cell.categories))
                                for (var k = 0; k < cell.categories.length; k++) {
                                    if (usedCategories.indexOf(cell.categories[k]) == -1)
                                        usedCategories.push(cell.categories[k]);
                                    if (filterCategories.indexOf(cell.categories[k]) != -1)
                                        anyUsed = true;
                                }
                            if (!anyUsed && filterCategories.length > 0)
                                unfullRows.push(tr);
                            else {
                                tr.appendChild(td);
                                count++;
                            }
                        };
                        for (var j = 0; j < row.length; j++) {
                            _loop_1(j);
                        }
                    });
                    while (unfullRows.length > 0) {
                        first = unfullRows[0];
                        len = computeRowWidth(first);
                        for (i_14 = 1; i_14 < unfullRows.length; i_14++) {
                            other = computeRowWidth(unfullRows[i_14]);
                            if (len + other <= 4) {
                                len += other;
                                for (j = 0; j < unfullRows[i_14].children.length; j++)
                                    first.appendChild(unfullRows[i_14].children[j]);
                                try {
                                    div.removeChild(unfullRows[i_14]);
                                }
                                catch (e) { }
                                unfullRows.splice(i_14, 1);
                                if (len == 4)
                                    break;
                                else
                                    continue;
                            }
                        }
                        unfullRows.splice(0, 1);
                    }
                    return [4 /*yield*/, categories];
                case 2:
                    data = _a.sent();
                    for (i_15 = data.length - 1; i_15 >= 0; i_15--)
                        if (usedCategories.indexOf(data[i_15].id) == -1)
                            data.splice(i_15, 1);
                    data.sort(function (a, b) {
                        return a.id - b.id;
                    });
                    while (settings.lastChild)
                        settings.removeChild(settings.lastChild);
                    for (i_16 = 0; i_16 < data.length; i_16++) {
                        item = createFilterItem(data[i_16].icon.url, data[i_16].title, filterCategories.indexOf(data[i_16].id) != -1, function (active) {
                            var id = parseInt(this.getAttribute("data-id") || "0");
                            var index = filterCategories.indexOf(id);
                            while (index != -1) {
                                filterCategories.splice(index, 1);
                                index = filterCategories.indexOf(id);
                            }
                            if (active)
                                filterCategories.push(id);
                            updateFilters();
                        });
                        item.setAttribute("data-id", data[i_16].id.toString());
                        // app doesn't color the text, idk what it does with the color
                        // item.style.color = "#" + data[i].color.substr(0, 6);
                        settings.appendChild(item);
                    }
                    return [2 /*return*/, {
                            items: flattend,
                            count: count,
                            categories: usedCategories
                        }];
            }
        });
    });
};
function insertImages(div, images, attr) {
    if (attr === void 0) { attr = "src"; }
    if (images.bgImage) {
        var img1 = document.createElement("img");
        img1.setAttribute(attr, images.bgImage.url);
        div.appendChild(img1);
    }
    if (images.fgImage) {
        var img2 = document.createElement("img");
        img2.setAttribute(attr, images.fgImage.url);
        div.appendChild(img2);
    }
}
function renderCouponTile(div, tile) {
    if (tile.images.bgColor && tile.images.bgColor.length == 6)
        div.style.backgroundColor = "#" + tile.images.bgColor;
    div.setAttribute("width", tile.dimension.width.toString());
    div.setAttribute("height", tile.dimension.height.toString());
    div.setAttribute("data", JSON.stringify(tile));
    var content = document.createElement("div");
    content.className = "content wonky";
    insertImages(content, tile.images);
    div.appendChild(content);
    var like = document.createElement("img");
    like.className = "like";
    like.src = likes.check(tile.id) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
    like.addEventListener("click", function () {
        this.src = likes.toggle(tile.id) ? "/img/icons/heart_filled.svg" : "/img/icons/heart.svg";
    });
    div.appendChild(like);
    return content;
}
///<reference path="pages.ts" />
///<reference path="../commons.ts" />
Pages.prototype.onClickPromo = function (event, pointer, cellElement, cellIndex) {
    if (!cellElement)
        return;
    var json = cellElement.getAttribute("data-json");
    if (!json)
        return;
    var data = JSON.parse(json);
    var activePromo = data.promoId;
    var promosWaiter = api.getPromos();
    var div = pages.openBlankGeneric("promos", cellElement, true, function () {
        return __awaiter(this, void 0, void 0, function () {
            var promos, carousel, targetIndex, i_17, cell, flkty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promosWaiter];
                    case 1:
                        promos = _a.sent();
                        carousel = document.createElement("div");
                        carousel.className = "carousel";
                        div.appendChild(carousel);
                        for (i_17 = 0; i_17 < promos.length; i_17++) {
                            if (promos[i_17].id && ignoredPromos.indexOf(promos[i_17].id) != -1)
                                continue;
                            cell = document.createElement("div");
                            cell.className = "carousel-cell promo";
                            renderPromo(cell, promos[i_17]);
                            carousel.appendChild(cell);
                            if (promos[i_17].id == activePromo)
                                targetIndex = i_17;
                        }
                        flkty = new Flickity(carousel, {
                            lazyLoad: 1,
                            prevNextButtons: false,
                            contain: true,
                            wrapAround: false,
                            adaptiveHeight: true,
                            pageDots: false,
                            initialIndex: targetIndex
                        });
                        flkty.on("change", function (index) {
                            activePromo = promos[index].id;
                            console.log(activePromo);
                        });
                        return [2 /*return*/];
                }
            });
        });
    }, [
        {
            icon: "/img/icons/share.svg",
            callback: function () {
                if (navigator.share) {
                    navigator.share({
                        text: translations.promo_share,
                        url: "burgerking://promos/" + activePromo
                    });
                }
            }
        }
    ]);
};
function renderPromo(div, promo) {
    var img = document.createElement("div");
    img.className = "promoimg";
    insertImages(img, promo.images, "data-flickity-lazyload");
    div.appendChild(img);
    var infos = document.createElement("div");
    infos.className = "highlit-panel promo-panel htmlview";
    div.appendChild(infos);
    var name = document.createElement("h3");
    name.textContent = promo.title.replace(/®/g, ""); // the ® sign looks too weird, so we strip it out from the big title
    infos.appendChild(name);
    if (typeof promo.description == "string" && promo.description.length > 0) {
        insertHTMLInto(promo.description, infos);
    }
    var footnote = document.createElement("div");
    footnote.className = "highlit-panel promo-panel footnote htmlview";
    div.appendChild(footnote);
    if (typeof promo.footnote == "string" && promo.footnote.length > 0) {
        insertHTMLInto(promo.footnote, footnote);
    }
}
/*!
 * Flickity PACKAGED v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */
!function (e, i) { "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery); }(window, function (t, e) {
    "use strict";
    var i = Array.prototype.slice, n = t.console, d = void 0 === n ? function () { } : function (t) { n.error(t); };
    function s(h, s, c) { (c = c || e || t.jQuery) && (s.prototype.option || (s.prototype.option = function (t) { c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t)); }), c.fn[h] = function (t) { return "string" == typeof t ? function (t, o, r) { var a, l = "$()." + h + '("' + o + '")'; return t.each(function (t, e) { var i = c.data(e, h); if (i) {
        var n = i[o];
        if (n && "_" != o.charAt(0)) {
            var s = n.apply(i, r);
            a = void 0 === a ? s : a;
        }
        else
            d(l + " is not a valid method");
    }
    else
        d(h + " not initialized. Cannot call methods, i.e. " + l); }), void 0 !== a ? a : t; }(this, t, i.call(arguments, 1)) : (function (t, n) { t.each(function (t, e) { var i = c.data(e, h); i ? (i.option(n), i._init()) : (i = new s(e, n), c.data(e, h, i)); }); }(this, t), this); }, o(c)); }
    function o(t) { !t || t && t.bridget || (t.bridget = s); }
    return o(e || t.jQuery), s;
}), function (t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e(); }("undefined" != typeof window ? window : this, function () { function t() { } var e = t.prototype; return e.on = function (t, e) { if (t && e) {
    var i = this._events = this._events || {}, n = i[t] = i[t] || [];
    return -1 == n.indexOf(e) && n.push(e), this;
} }, e.once = function (t, e) { if (t && e) {
    this.on(t, e);
    var i = this._onceEvents = this._onceEvents || {};
    return (i[t] = i[t] || {})[e] = !0, this;
} }, e.off = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) {
    var n = i.indexOf(e);
    return -1 != n && i.splice(n, 1), this;
} }, e.emitEvent = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) {
    i = i.slice(0), e = e || [];
    for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
        var o = i[s];
        n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
    }
    return this;
} }, e.allOff = function () { delete this._events, delete this._onceEvents; }, t; }), function (t, e) { "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e(); }(window, function () {
    "use strict";
    function m(t) { var e = parseFloat(t); return -1 == t.indexOf("%") && !isNaN(e) && e; }
    var i = "undefined" == typeof console ? function () { } : function (t) { console.error(t); }, y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], b = y.length;
    function E(t) { var e = getComputedStyle(t); return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e; }
    var S, C = !1;
    function x(t) { if (function () { if (!C) {
        C = !0;
        var t = document.createElement("div");
        t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
        var e = document.body || document.documentElement;
        e.appendChild(t);
        var i = E(t);
        S = 200 == Math.round(m(i.width)), x.isBoxSizeOuter = S, e.removeChild(t);
    } }(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
        var e = E(t);
        if ("none" == e.display)
            return function () { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < b; e++) {
                t[y[e]] = 0;
            } return t; }();
        var i = {};
        i.width = t.offsetWidth, i.height = t.offsetHeight;
        for (var n = i.isBorderBox = "border-box" == e.boxSizing, s = 0; s < b; s++) {
            var o = y[s], r = e[o], a = parseFloat(r);
            i[o] = isNaN(a) ? 0 : a;
        }
        var l = i.paddingLeft + i.paddingRight, h = i.paddingTop + i.paddingBottom, c = i.marginLeft + i.marginRight, d = i.marginTop + i.marginBottom, u = i.borderLeftWidth + i.borderRightWidth, f = i.borderTopWidth + i.borderBottomWidth, p = n && S, g = m(e.width);
        !1 !== g && (i.width = g + (p ? 0 : l + u));
        var v = m(e.height);
        return !1 !== v && (i.height = v + (p ? 0 : h + f)), i.innerWidth = i.width - (l + u), i.innerHeight = i.height - (h + f), i.outerWidth = i.width + c, i.outerHeight = i.height + d, i;
    } }
    return x;
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
    "use strict";
    var i = function () { var t = window.Element.prototype; if (t.matches)
        return "matches"; if (t.matchesSelector)
        return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i] + "MatchesSelector";
        if (t[n])
            return n;
    } }();
    return function (t, e) { return t[i](e); };
}), function (e, i) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector); }(window, function (h, o) { var c = { extend: function (t, e) { for (var i in e)
        t[i] = e[i]; return t; }, modulo: function (t, e) { return (t % e + e) % e; } }, e = Array.prototype.slice; c.makeArray = function (t) { return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t]; }, c.removeFrom = function (t, e) { var i = t.indexOf(e); -1 != i && t.splice(i, 1); }, c.getParent = function (t, e) { for (; t.parentNode && t != document.body;)
    if (t = t.parentNode, o(t, e))
        return t; }, c.getQueryElement = function (t) { return "string" == typeof t ? document.querySelector(t) : t; }, c.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t); }, c.filterFindElements = function (t, n) { t = c.makeArray(t); var s = []; return t.forEach(function (t) { if (t instanceof HTMLElement)
    if (n) {
        o(t, n) && s.push(t);
        for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++)
            s.push(e[i]);
    }
    else
        s.push(t); }), s; }, c.debounceMethod = function (t, e, n) { n = n || 100; var s = t.prototype[e], o = e + "Timeout"; t.prototype[e] = function () { var t = this[o]; clearTimeout(t); var e = arguments, i = this; this[o] = setTimeout(function () { s.apply(i, e), delete i[o]; }, n); }; }, c.docReady = function (t) { var e = document.readyState; "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t); }, c.toDashed = function (t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i; }).toLowerCase(); }; var d = h.console; return c.htmlInit = function (a, l) { c.docReady(function () { var t = c.toDashed(l), s = "data-" + t, e = document.querySelectorAll("[" + s + "]"), i = document.querySelectorAll(".js-" + t), n = c.makeArray(e).concat(c.makeArray(i)), o = s + "-options", r = h.jQuery; n.forEach(function (e) { var t, i = e.getAttribute(s) || e.getAttribute(o); try {
    t = i && JSON.parse(i);
}
catch (t) {
    return void (d && d.error("Error parsing " + s + " on " + e.className + ": " + t));
} var n = new a(e, t); r && r.data(e, l, n); }); }); }, c; }), function (e, i) { "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = i(e, e.getSize)); }(window, function (t, e) { function i(t, e) { this.element = t, this.parent = e, this.create(); } var n = i.prototype; return n.create = function () { this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0; }, n.destroy = function () { this.unselect(), this.element.style.position = ""; var t = this.parent.originSide; this.element.style[t] = ""; }, n.getSize = function () { this.size = e(this.element); }, n.setPosition = function (t) { this.x = t, this.updateTarget(), this.renderPosition(t); }, n.updateTarget = n.setDefaultTarget = function () { var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight"; this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign; }, n.renderPosition = function (t) { var e = this.parent.originSide; this.element.style[e] = this.parent.getPositionValue(t); }, n.select = function () { this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden"); }, n.unselect = function () { this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true"); }, n.wrapShift = function (t) { this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t); }, n.remove = function () { this.element.parentNode.removeChild(this.element); }, i; }), function (t, e) { "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e()); }(window, function () {
    "use strict";
    function t(t) { this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0; }
    var e = t.prototype;
    return e.addCell = function (t) { if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
        this.x = t.x;
        var e = this.isOriginLeft ? "marginLeft" : "marginRight";
        this.firstMargin = t.size[e];
    } }, e.updateTarget = function () { var t = this.isOriginLeft ? "marginRight" : "marginLeft", e = this.getLastCell(), i = e ? e.size[t] : 0, n = this.outerWidth - (this.firstMargin + i); this.target = this.x + this.firstMargin + n * this.parent.cellAlign; }, e.getLastCell = function () { return this.cells[this.cells.length - 1]; }, e.select = function () { this.cells.forEach(function (t) { t.select(); }); }, e.unselect = function () { this.cells.forEach(function (t) { t.unselect(); }); }, e.getCellElements = function () { return this.cells.map(function (t) { return t.element; }); }, t;
}), function (e, i) { "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = i(e, e.fizzyUIUtils)); }(window, function (t, e) { var i = { startAnimation: function () { this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate()); }, animate: function () { this.applyDragForce(), this.applySelectedAttraction(); var t = this.x; if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
        var e = this;
        requestAnimationFrame(function () { e.animate(); });
    } }, positionSlider: function () { var t = this.x; this.options.wrapAround && 1 < this.cells.length && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent(); }, setTranslateX: function (t, e) { t += this.cursorPosition, t = this.options.rightToLeft ? -t : t; var i = this.getPositionValue(t); this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"; }, dispatchScrollEvent: function () { var t = this.slides[0]; if (t) {
        var e = -this.x - t.target, i = e / this.slidesWidth;
        this.dispatchEvent("scroll", null, [i, e]);
    } }, positionSliderAtSelected: function () { this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider()); }, getPositionValue: function (t) { return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"; }, settle: function (t) { this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex])); }, shiftWrapCells: function (t) { var e = this.cursorPosition + t; this._shiftCells(this.beforeShiftCells, e, -1); var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition); this._shiftCells(this.afterShiftCells, i, 1); }, _shiftCells: function (t, e, i) { for (var n = 0; n < t.length; n++) {
        var s = t[n], o = 0 < e ? i : 0;
        s.wrapShift(o), e -= s.size.outerWidth;
    } }, _unshiftCells: function (t) { if (t && t.length)
        for (var e = 0; e < t.length; e++)
            t[e].wrapShift(0); }, integratePhysics: function () { this.x += this.velocity, this.velocity *= this.getFrictionFactor(); }, applyForce: function (t) { this.velocity += t; }, getFrictionFactor: function () { return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]; }, getRestingPosition: function () { return this.x + this.velocity / (1 - this.getFrictionFactor()); }, applyDragForce: function () { if (this.isDraggable && this.isPointerDown) {
        var t = this.dragX - this.x - this.velocity;
        this.applyForce(t);
    } }, applySelectedAttraction: function () { if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
        var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
        this.applyForce(t);
    } } }; return i; }), function (r, a) { if ("function" == typeof define && define.amd)
    define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (t, e, i, n, s, o) { return a(r, t, e, i, n, s, o); });
else if ("object" == typeof module && module.exports)
    module.exports = a(r, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
else {
    var t = r.Flickity;
    r.Flickity = a(r, r.EvEmitter, r.getSize, r.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype);
} }(window, function (n, t, e, a, i, r, s) { var l = n.jQuery, o = n.getComputedStyle, h = n.console; function c(t, e) { for (t = a.makeArray(t); t.length;)
    e.appendChild(t.shift()); } var d = 0, u = {}; function f(t, e) { var i = a.getQueryElement(t); if (i) {
    if (this.element = i, this.element.flickityGUID) {
        var n = u[this.element.flickityGUID];
        return n.option(e), n;
    }
    l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(e), this._create();
}
else
    h && h.error("Bad element for Flickity: " + (i || t)); } f.defaults = { accessibility: !0, cellAlign: "center", freeScrollFriction: .075, friction: .28, namespaceJQueryEvents: !0, percentPosition: !0, resize: !0, selectedAttraction: .025, setGallerySize: !0 }, f.createMethods = []; var p = f.prototype; a.extend(p, t.prototype), p._create = function () { var t = this.guid = ++d; for (var e in this.element.flickityGUID = t, (u[t] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && n.addEventListener("resize", this), this.options.on) {
    var i = this.options.on[e];
    this.on(e, i);
} f.createMethods.forEach(function (t) { this[t](); }, this), this.options.watchCSS ? this.watchCSS() : this.activate(); }, p.option = function (t) { a.extend(this.options, t); }, p.activate = function () { this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), c(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready")); }, p._createSlider = function () { var t = document.createElement("div"); t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t; }, p._filterFindCellElements = function (t) { return a.filterFindElements(t, this.options.cellSelector); }, p.reloadCells = function () { this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(); }, p._makeCells = function (t) { return this._filterFindCellElements(t).map(function (t) { return new i(t, this); }, this); }, p.getLastCell = function () { return this.cells[this.cells.length - 1]; }, p.getLastSlide = function () { return this.slides[this.slides.length - 1]; }, p.positionCells = function () { this._sizeCells(this.cells), this._positionCells(0); }, p._positionCells = function (t) { t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0; var e = 0; if (0 < t) {
    var i = this.cells[t - 1];
    e = i.x + i.size.outerWidth;
} for (var n = this.cells.length, s = t; s < n; s++) {
    var o = this.cells[s];
    o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight);
} this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0; }, p._sizeCells = function (t) { t.forEach(function (t) { t.getSize(); }); }, p.updateSlides = function () { if (this.slides = [], this.cells.length) {
    var n = new r(this);
    this.slides.push(n);
    var s = "left" == this.originSide ? "marginRight" : "marginLeft", o = this._getCanCellFit();
    this.cells.forEach(function (t, e) { if (n.cells.length) {
        var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
        o.call(this, e, i) || (n.updateTarget(), n = new r(this), this.slides.push(n)), n.addCell(t);
    }
    else
        n.addCell(t); }, this), n.updateTarget(), this.updateSelectedSlide();
} }, p._getCanCellFit = function () { var t = this.options.groupCells; if (!t)
    return function () { return !1; }; if ("number" == typeof t) {
    var e = parseInt(t, 10);
    return function (t) { return t % e != 0; };
} var i = "string" == typeof t && t.match(/^(\d+)%$/), n = i ? parseInt(i[1], 10) / 100 : 1; return function (t, e) { return e <= (this.size.innerWidth + 1) * n; }; }, p._init = p.reposition = function () { this.positionCells(), this.positionSliderAtSelected(); }, p.getSize = function () { this.size = e(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign; }; var g = { center: { left: .5, right: .5 }, left: { left: 0, right: 1 }, right: { right: 0, left: 1 } }; return p.setCellAlign = function () { var t = g[this.options.cellAlign]; this.cellAlign = t ? t[this.originSide] : this.options.cellAlign; }, p.setGallerySize = function () { if (this.options.setGallerySize) {
    var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = t + "px";
} }, p._getWrapShiftCells = function () { if (this.options.wrapAround) {
    this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
    var t = this.cursorPosition, e = this.cells.length - 1;
    this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1);
} }, p._getGapCells = function (t, e, i) { for (var n = []; 0 < t;) {
    var s = this.cells[e];
    if (!s)
        break;
    n.push(s), e += i, t -= s.size.outerWidth;
} return n; }, p._containSlides = function () { if (this.options.contain && !this.options.wrapAround && this.cells.length) {
    var t = this.options.rightToLeft, e = t ? "marginRight" : "marginLeft", i = t ? "marginLeft" : "marginRight", n = this.slideableWidth - this.getLastCell().size[i], s = n < this.size.innerWidth, o = this.cursorPosition + this.cells[0].size[e], r = n - this.size.innerWidth * (1 - this.cellAlign);
    this.slides.forEach(function (t) { s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r)); }, this);
} }, p.dispatchEvent = function (t, e, i) { var n = e ? [e].concat(i) : i; if (this.emitEvent(t, n), l && this.$element) {
    var s = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
    if (e) {
        var o = l.Event(e);
        o.type = t, s = o;
    }
    this.$element.trigger(s, i);
} }, p.select = function (t, e, i) { if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = a.modulo(t, this.slides.length)), this.slides[t])) {
    var n = this.selectedIndex;
    this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != n && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect");
} }, p._wrapSelect = function (t) { var e = this.slides.length; if (!(this.options.wrapAround && 1 < e))
    return t; var i = a.modulo(t, e), n = Math.abs(i - this.selectedIndex), s = Math.abs(i + e - this.selectedIndex), o = Math.abs(i - e - this.selectedIndex); !this.isDragSelect && s < n ? t += e : !this.isDragSelect && o < n && (t -= e), t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth); }, p.previous = function (t, e) { this.select(this.selectedIndex - 1, t, e); }, p.next = function (t, e) { this.select(this.selectedIndex + 1, t, e); }, p.updateSelectedSlide = function () { var t = this.slides[this.selectedIndex]; t && (this.unselectSelectedSlide(), (this.selectedSlide = t).select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0]); }, p.unselectSelectedSlide = function () { this.selectedSlide && this.selectedSlide.unselect(); }, p.selectInitialIndex = function () { var t = this.options.initialIndex; if (this.isInitActivated)
    this.select(this.selectedIndex, !1, !0);
else {
    if (t && "string" == typeof t)
        if (this.queryCell(t))
            return void this.selectCell(t, !1, !0);
    var e = 0;
    t && this.slides[t] && (e = t), this.select(e, !1, !0);
} }, p.selectCell = function (t, e, i) { var n = this.queryCell(t); if (n) {
    var s = this.getCellSlideIndex(n);
    this.select(s, e, i);
} }, p.getCellSlideIndex = function (t) { for (var e = 0; e < this.slides.length; e++) {
    if (-1 != this.slides[e].cells.indexOf(t))
        return e;
} }, p.getCell = function (t) { for (var e = 0; e < this.cells.length; e++) {
    var i = this.cells[e];
    if (i.element == t)
        return i;
} }, p.getCells = function (t) { t = a.makeArray(t); var i = []; return t.forEach(function (t) { var e = this.getCell(t); e && i.push(e); }, this), i; }, p.getCellElements = function () { return this.cells.map(function (t) { return t.element; }); }, p.getParentCell = function (t) { var e = this.getCell(t); return e || (t = a.getParent(t, ".flickity-slider > *"), this.getCell(t)); }, p.getAdjacentCellElements = function (t, e) { if (!t)
    return this.selectedSlide.getCellElements(); e = void 0 === e ? this.selectedIndex : e; var i = this.slides.length; if (i <= 1 + 2 * t)
    return this.getCellElements(); for (var n = [], s = e - t; s <= e + t; s++) {
    var o = this.options.wrapAround ? a.modulo(s, i) : s, r = this.slides[o];
    r && (n = n.concat(r.getCellElements()));
} return n; }, p.queryCell = function (t) { if ("number" == typeof t)
    return this.cells[t]; if ("string" == typeof t) {
    if (t.match(/^[#\.]?[\d\/]/))
        return;
    t = this.element.querySelector(t);
} return this.getCell(t); }, p.uiChange = function () { this.emitEvent("uiChange"); }, p.childUIPointerDown = function (t) { "touchstart" != t.type && t.preventDefault(), this.focus(); }, p.onresize = function () { this.watchCSS(), this.resize(); }, a.debounceMethod(f, "onresize", 150), p.resize = function () { if (this.isActive) {
    this.getSize(), this.options.wrapAround && (this.x = a.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
    var t = this.selectedElements && this.selectedElements[0];
    this.selectCell(t, !1, !0);
} }, p.watchCSS = function () { this.options.watchCSS && (-1 != o(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate()); }, p.onkeydown = function (t) { var e = document.activeElement && document.activeElement != this.element; if (this.options.accessibility && !e) {
    var i = f.keyboardHandlers[t.keyCode];
    i && i.call(this);
} }, f.keyboardHandlers = { 37: function () { var t = this.options.rightToLeft ? "next" : "previous"; this.uiChange(), this[t](); }, 39: function () { var t = this.options.rightToLeft ? "previous" : "next"; this.uiChange(), this[t](); } }, p.focus = function () { var t = n.pageYOffset; this.element.focus({ preventScroll: !0 }), n.pageYOffset != t && n.scrollTo(n.pageXOffset, t); }, p.deactivate = function () { this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (t) { t.destroy(); }), this.element.removeChild(this.viewport), c(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate")); }, p.destroy = function () { this.deactivate(), n.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), l && this.$element && l.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete u[this.guid]; }, a.extend(p, s), f.data = function (t) { var e = (t = a.getQueryElement(t)) && t.flickityGUID; return e && u[e]; }, a.htmlInit(f, "flickity"), l && l.bridget && l.bridget("flickity", f), f.setJQuery = function (t) { l = t; }, f.Cell = i, f.Slide = r, f; }), function (e, i) { "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter); }(window, function (s, t) { function e() { } var i = e.prototype = Object.create(t.prototype); i.bindStartEvent = function (t) { this._bindStartEvent(t, !0); }, i.unbindStartEvent = function (t) { this._bindStartEvent(t, !1); }, i._bindStartEvent = function (t, e) { var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = "mousedown"; s.PointerEvent ? n = "pointerdown" : "ontouchstart" in s && (n = "touchstart"), t[i](n, this); }, i.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t); }, i.getTouch = function (t) { for (var e = 0; e < t.length; e++) {
    var i = t[e];
    if (i.identifier == this.pointerIdentifier)
        return i;
} }, i.onmousedown = function (t) { var e = t.button; e && 0 !== e && 1 !== e || this._pointerDown(t, t); }, i.ontouchstart = function (t) { this._pointerDown(t, t.changedTouches[0]); }, i.onpointerdown = function (t) { this._pointerDown(t, t); }, i._pointerDown = function (t, e) { t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e)); }, i.pointerDown = function (t, e) { this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]); }; var n = { mousedown: ["mousemove", "mouseup"], touchstart: ["touchmove", "touchend", "touchcancel"], pointerdown: ["pointermove", "pointerup", "pointercancel"] }; return i._bindPostStartEvents = function (t) { if (t) {
    var e = n[t.type];
    e.forEach(function (t) { s.addEventListener(t, this); }, this), this._boundPointerEvents = e;
} }, i._unbindPostStartEvents = function () { this._boundPointerEvents && (this._boundPointerEvents.forEach(function (t) { s.removeEventListener(t, this); }, this), delete this._boundPointerEvents); }, i.onmousemove = function (t) { this._pointerMove(t, t); }, i.onpointermove = function (t) { t.pointerId == this.pointerIdentifier && this._pointerMove(t, t); }, i.ontouchmove = function (t) { var e = this.getTouch(t.changedTouches); e && this._pointerMove(t, e); }, i._pointerMove = function (t, e) { this.pointerMove(t, e); }, i.pointerMove = function (t, e) { this.emitEvent("pointerMove", [t, e]); }, i.onmouseup = function (t) { this._pointerUp(t, t); }, i.onpointerup = function (t) { t.pointerId == this.pointerIdentifier && this._pointerUp(t, t); }, i.ontouchend = function (t) { var e = this.getTouch(t.changedTouches); e && this._pointerUp(t, e); }, i._pointerUp = function (t, e) { this._pointerDone(), this.pointerUp(t, e); }, i.pointerUp = function (t, e) { this.emitEvent("pointerUp", [t, e]); }, i._pointerDone = function () { this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone(); }, i._pointerReset = function () { this.isPointerDown = !1, delete this.pointerIdentifier; }, i.pointerDone = function () { }, i.onpointercancel = function (t) { t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t); }, i.ontouchcancel = function (t) { var e = this.getTouch(t.changedTouches); e && this._pointerCancel(t, e); }, i._pointerCancel = function (t, e) { this._pointerDone(), this.pointerCancel(t, e); }, i.pointerCancel = function (t, e) { this.emitEvent("pointerCancel", [t, e]); }, e.getPointerPoint = function (t) { return { x: t.pageX, y: t.pageY }; }, e; }), function (e, i) { "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer); }(window, function (o, t) { function e() { } var i = e.prototype = Object.create(t.prototype); i.bindHandles = function () { this._bindHandles(!0); }, i.unbindHandles = function () { this._bindHandles(!1); }, i._bindHandles = function (t) { for (var e = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
    var s = this.handles[n];
    this._bindStartEvent(s, t), s[e]("click", this), o.PointerEvent && (s.style.touchAction = i);
} }, i._touchActionValue = "none", i.pointerDown = function (t, e) { this.okayPointerDown(t) && (this.pointerDownPointer = e, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])); }; var s = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 }, r = { radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0 }; return i.okayPointerDown = function (t) { var e = s[t.target.nodeName], i = r[t.target.type], n = !e || i; return n || this._pointerReset(), n; }, i.pointerDownBlur = function () { var t = document.activeElement; t && t.blur && t != document.body && t.blur(); }, i.pointerMove = function (t, e) { var i = this._dragPointerMove(t, e); this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i); }, i._dragPointerMove = function (t, e) { var i = { x: e.pageX - this.pointerDownPointer.pageX, y: e.pageY - this.pointerDownPointer.pageY }; return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i; }, i.hasDragStarted = function (t) { return 3 < Math.abs(t.x) || 3 < Math.abs(t.y); }, i.pointerUp = function (t, e) { this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e); }, i._dragPointerUp = function (t, e) { this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e); }, i._dragStart = function (t, e) { this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e); }, i.dragStart = function (t, e) { this.emitEvent("dragStart", [t, e]); }, i._dragMove = function (t, e, i) { this.isDragging && this.dragMove(t, e, i); }, i.dragMove = function (t, e, i) { t.preventDefault(), this.emitEvent("dragMove", [t, e, i]); }, i._dragEnd = function (t, e) { this.isDragging = !1, setTimeout(function () { delete this.isPreventingClicks; }.bind(this)), this.dragEnd(t, e); }, i.dragEnd = function (t, e) { this.emitEvent("dragEnd", [t, e]); }, i.onclick = function (t) { this.isPreventingClicks && t.preventDefault(); }, i._staticClick = function (t, e) { this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () { delete this.isIgnoringMouseUp; }.bind(this), 400))); }, i.staticClick = function (t, e) { this.emitEvent("staticClick", [t, e]); }, e.getPointerPoint = t.getPointerPoint, e; }), function (n, s) { "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (t, e, i) { return s(n, t, e, i); }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils); }(window, function (i, t, e, a) { a.extend(t.defaults, { draggable: ">1", dragThreshold: 3 }), t.createMethods.push("_createDrag"); var n = t.prototype; a.extend(n, e.prototype), n._touchActionValue = "pan-y"; var s = "createTouch" in document, o = !1; n._createDrag = function () { this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), s && !o && (i.addEventListener("touchmove", function () { }), o = !0); }, n.onActivateDrag = function () { this.handles = [this.viewport], this.bindHandles(), this.updateDraggable(); }, n.onDeactivateDrag = function () { this.unbindHandles(), this.element.classList.remove("is-draggable"); }, n.updateDraggable = function () { ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable"); }, n.bindDrag = function () { this.options.draggable = !0, this.updateDraggable(); }, n.unbindDrag = function () { this.options.draggable = !1, this.updateDraggable(); }, n._uiChangeDrag = function () { delete this.isFreeScrolling; }, n.pointerDown = function (t, e) { this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t), this.pointerDownFocus(t), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), i.addEventListener("scroll", this), this._pointerDownDefault(t, e)) : this._pointerDownDefault(t, e); }, n._pointerDownDefault = function (t, e) { this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e]); }; var r = { INPUT: !0, TEXTAREA: !0, SELECT: !0 }; function l() { return { x: i.pageXOffset, y: i.pageYOffset }; } return n.pointerDownFocus = function (t) { r[t.target.nodeName] || this.focus(); }, n._pointerDownPreventDefault = function (t) { var e = "touchstart" == t.type, i = "touch" == t.pointerType, n = r[t.target.nodeName]; e || i || n || t.preventDefault(); }, n.hasDragStarted = function (t) { return Math.abs(t.x) > this.options.dragThreshold; }, n.pointerUp = function (t, e) { delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e); }, n.pointerDone = function () { i.removeEventListener("scroll", this), delete this.pointerDownScroll; }, n.dragStart = function (t, e) { this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), i.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [e])); }, n.pointerMove = function (t, e) { var i = this._dragPointerMove(t, e); this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i); }, n.dragMove = function (t, e, i) { if (this.isDraggable) {
    t.preventDefault(), this.previousDragX = this.dragX;
    var n = this.options.rightToLeft ? -1 : 1;
    this.options.wrapAround && (i.x = i.x % this.slideableWidth);
    var s = this.dragStartPosition + i.x * n;
    if (!this.options.wrapAround && this.slides.length) {
        var o = Math.max(-this.slides[0].target, this.dragStartPosition);
        s = o < s ? .5 * (s + o) : s;
        var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
        s = s < r ? .5 * (s + r) : s;
    }
    this.dragX = s, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i]);
} }, n.dragEnd = function (t, e) { if (this.isDraggable) {
    this.options.freeScroll && (this.isFreeScrolling = !0);
    var i = this.dragEndRestingSelect();
    if (this.options.freeScroll && !this.options.wrapAround) {
        var n = this.getRestingPosition();
        this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target;
    }
    else
        this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
    delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e]);
} }, n.dragEndRestingSelect = function () { var t = this.getRestingPosition(), e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)), i = this._getClosestResting(t, e, 1), n = this._getClosestResting(t, e, -1); return i.distance < n.distance ? i.index : n.index; }, n._getClosestResting = function (t, e, i) { for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function (t, e) { return t <= e; } : function (t, e) { return t < e; }; o(e, s) && (n += i, s = e, null !== (e = this.getSlideDistance(-t, n)));)
    e = Math.abs(e); return { distance: s, index: n - i }; }, n.getSlideDistance = function (t, e) { var i = this.slides.length, n = this.options.wrapAround && 1 < i, s = n ? a.modulo(e, i) : e, o = this.slides[s]; if (!o)
    return null; var r = n ? this.slideableWidth * Math.floor(e / i) : 0; return t - (o.target + r); }, n.dragEndBoostSelect = function () { if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime)
    return 0; var t = this.getSlideDistance(-this.dragX, this.selectedIndex), e = this.previousDragX - this.dragX; return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0; }, n.staticClick = function (t, e) { var i = this.getParentCell(t.target), n = i && i.element, s = i && this.cells.indexOf(i); this.dispatchEvent("staticClick", t, [e, n, s]); }, n.onscroll = function () { var t = l(), e = this.pointerDownScroll.x - t.x, i = this.pointerDownScroll.y - t.y; (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone(); }, t; }), function (n, s) { "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (t, e, i) { return s(n, t, e, i); }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils); }(window, function (t, e, i, n) {
    "use strict";
    var s = "http://www.w3.org/2000/svg";
    function o(t, e) { this.direction = t, this.parent = e, this._create(); }
    (o.prototype = Object.create(i.prototype))._create = function () { this.isEnabled = !0, this.isPrevious = -1 == this.direction; var t = this.parent.options.rightToLeft ? 1 : -1; this.isLeft = this.direction == t; var e = this.element = document.createElement("button"); e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next"); var i = this.createSVG(); e.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent)); }, o.prototype.activate = function () { this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element); }, o.prototype.deactivate = function () { this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this); }, o.prototype.createSVG = function () { var t = document.createElementNS(s, "svg"); t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100"); var e = document.createElementNS(s, "path"), i = function (t) { return "string" != typeof t ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t; }(this.parent.options.arrowShape); return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t; }, o.prototype.handleEvent = n.handleEvent, o.prototype.onclick = function () { if (this.isEnabled) {
        this.parent.uiChange();
        var t = this.isPrevious ? "previous" : "next";
        this.parent[t]();
    } }, o.prototype.enable = function () { this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0); }, o.prototype.disable = function () { this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1); }, o.prototype.update = function () { var t = this.parent.slides; if (this.parent.options.wrapAround && 1 < t.length)
        this.enable();
    else {
        var e = t.length ? t.length - 1 : 0, i = this.isPrevious ? 0 : e;
        this[this.parent.selectedIndex == i ? "disable" : "enable"]();
    } }, o.prototype.destroy = function () { this.deactivate(), this.allOff(); }, n.extend(e.defaults, { prevNextButtons: !0, arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 } }), e.createMethods.push("_createPrevNextButtons");
    var r = e.prototype;
    return r._createPrevNextButtons = function () { this.options.prevNextButtons && (this.prevButton = new o(-1, this), this.nextButton = new o(1, this), this.on("activate", this.activatePrevNextButtons)); }, r.activatePrevNextButtons = function () { this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons); }, r.deactivatePrevNextButtons = function () { this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons); }, e.PrevNextButton = o, e;
}), function (n, s) { "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (t, e, i) { return s(n, t, e, i); }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils); }(window, function (t, e, i, n) { function s(t) { this.parent = t, this._create(); } (s.prototype = Object.create(i.prototype))._create = function () { this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent)); }, s.prototype.activate = function () { this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder); }, s.prototype.deactivate = function () { this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder); }, s.prototype.setDots = function () { var t = this.parent.slides.length - this.dots.length; 0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t); }, s.prototype.addDots = function (t) { for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
    var r = document.createElement("li");
    r.className = "dot", r.setAttribute("aria-label", "Page dot " + (o + 1)), e.appendChild(r), i.push(r);
} this.holder.appendChild(e), this.dots = this.dots.concat(i); }, s.prototype.removeDots = function (t) { this.dots.splice(this.dots.length - t, t).forEach(function (t) { this.holder.removeChild(t); }, this); }, s.prototype.updateSelected = function () { this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step")); }, s.prototype.onTap = s.prototype.onClick = function (t) { var e = t.target; if ("LI" == e.nodeName) {
    this.parent.uiChange();
    var i = this.dots.indexOf(e);
    this.parent.select(i);
} }, s.prototype.destroy = function () { this.deactivate(), this.allOff(); }, e.PageDots = s, n.extend(e.defaults, { pageDots: !0 }), e.createMethods.push("_createPageDots"); var o = e.prototype; return o._createPageDots = function () { this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots)); }, o.activatePageDots = function () { this.pageDots.activate(); }, o.updateSelectedPageDots = function () { this.pageDots.updateSelected(); }, o.updatePageDots = function () { this.pageDots.setDots(); }, o.deactivatePageDots = function () { this.pageDots.deactivate(); }, e.PageDots = s, e; }), function (t, n) { "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, e, i) { return n(t, e, i); }) : "object" == typeof module && module.exports ? module.exports = n(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : n(t.EvEmitter, t.fizzyUIUtils, t.Flickity); }(window, function (t, e, i) { function n(t) { this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this); } (n.prototype = Object.create(t.prototype)).play = function () { "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick())); }, n.prototype.tick = function () { if ("playing" == this.state) {
    var t = this.parent.options.autoPlay;
    t = "number" == typeof t ? t : 3e3;
    var e = this;
    this.clear(), this.timeout = setTimeout(function () { e.parent.next(!0), e.tick(); }, t);
} }, n.prototype.stop = function () { this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange); }, n.prototype.clear = function () { clearTimeout(this.timeout); }, n.prototype.pause = function () { "playing" == this.state && (this.state = "paused", this.clear()); }, n.prototype.unpause = function () { "paused" == this.state && this.play(); }, n.prototype.visibilityChange = function () { this[document.hidden ? "pause" : "unpause"](); }, n.prototype.visibilityPlay = function () { this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay); }, e.extend(i.defaults, { pauseAutoPlayOnHover: !0 }), i.createMethods.push("_createPlayer"); var s = i.prototype; return s._createPlayer = function () { this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer); }, s.activatePlayer = function () { this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this)); }, s.playPlayer = function () { this.player.play(); }, s.stopPlayer = function () { this.player.stop(); }, s.pausePlayer = function () { this.player.pause(); }, s.unpausePlayer = function () { this.player.unpause(); }, s.deactivatePlayer = function () { this.player.stop(), this.element.removeEventListener("mouseenter", this); }, s.onmouseenter = function () { this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this)); }, s.onmouseleave = function () { this.player.unpause(), this.element.removeEventListener("mouseleave", this); }, i.Player = n, i; }), function (i, n) { "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (t, e) { return n(i, t, e); }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils); }(window, function (t, e, n) { var i = e.prototype; return i.insert = function (t, e) { var i = this._makeCells(t); if (i && i.length) {
    var n = this.cells.length;
    e = void 0 === e ? n : e;
    var s = function (t) { var e = document.createDocumentFragment(); return t.forEach(function (t) { e.appendChild(t.element); }), e; }(i), o = e == n;
    if (o)
        this.slider.appendChild(s);
    else {
        var r = this.cells[e].element;
        this.slider.insertBefore(s, r);
    }
    if (0 === e)
        this.cells = i.concat(this.cells);
    else if (o)
        this.cells = this.cells.concat(i);
    else {
        var a = this.cells.splice(e, n - e);
        this.cells = this.cells.concat(i).concat(a);
    }
    this._sizeCells(i), this.cellChange(e, !0);
} }, i.append = function (t) { this.insert(t, this.cells.length); }, i.prepend = function (t) { this.insert(t, 0); }, i.remove = function (t) { var e = this.getCells(t); if (e && e.length) {
    var i = this.cells.length - 1;
    e.forEach(function (t) { t.remove(); var e = this.cells.indexOf(t); i = Math.min(e, i), n.removeFrom(this.cells, t); }, this), this.cellChange(i, !0);
} }, i.cellSizeChange = function (t) { var e = this.getCell(t); if (e) {
    e.getSize();
    var i = this.cells.indexOf(e);
    this.cellChange(i);
} }, i.cellChange = function (t, e) { var i = this.selectedElement; this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize(); var n = this.getCell(i); n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected(); }, e; }), function (i, n) { "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (t, e) { return n(i, t, e); }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils); }(window, function (t, e, o) {
    "use strict";
    e.createMethods.push("_createLazyload");
    var i = e.prototype;
    function s(t, e) { this.img = t, this.flickity = e, this.load(); }
    return i._createLazyload = function () { this.on("select", this.lazyLoad); }, i.lazyLoad = function () { var t = this.options.lazyLoad; if (t) {
        var e = "number" == typeof t ? t : 0, i = this.getAdjacentCellElements(e), n = [];
        i.forEach(function (t) { var e = function (t) { if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload"), i = t.getAttribute("data-flickity-lazyload-src"), n = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || i || n)
                return [t];
        } var s = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"); return o.makeArray(s); }(t); n = n.concat(e); }), n.forEach(function (t) { new s(t, this); }, this);
    } }, s.prototype.handleEvent = o.handleEvent, s.prototype.load = function () { this.img.addEventListener("load", this), this.img.addEventListener("error", this); var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"), e = this.img.getAttribute("data-flickity-lazyload-srcset"); this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset"); }, s.prototype.onload = function (t) { this.complete(t, "flickity-lazyloaded"); }, s.prototype.onerror = function (t) { this.complete(t, "flickity-lazyerror"); }, s.prototype.complete = function (t, e) { this.img.removeEventListener("load", this), this.img.removeEventListener("error", this); var i = this.flickity.getParentCell(this.img), n = i && i.element; this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n); }, e.LazyLoader = s, e;
}), function (t, e) { "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload"))); }(window, function (t) { return t; }), function (t, e) { "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils); }(window, function (n, s) { n.createMethods.push("_createAsNavFor"); var t = n.prototype; return t._createAsNavFor = function () { this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor); var t = this.options.asNavFor; if (t) {
    var e = this;
    setTimeout(function () { e.setNavCompanion(t); });
} }, t.setNavCompanion = function (t) { t = s.getQueryElement(t); var e = n.data(t); if (e && e != this) {
    this.navCompanion = e;
    var i = this;
    this.onNavCompanionSelect = function () { i.navCompanionSelect(); }, e.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0);
} }, t.navCompanionSelect = function (t) { var e = this.navCompanion && this.navCompanion.selectedCells; if (e) {
    var i = e[0], n = this.navCompanion.cells.indexOf(i), s = n + e.length - 1, o = Math.floor(function (t, e, i) { return (e - t) * i + t; }(n, s, this.navCompanion.cellAlign));
    if (this.selectCell(o, !1, t), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
        var r = this.cells.slice(n, 1 + s);
        this.navSelectedElements = r.map(function (t) { return t.element; }), this.changeNavSelectedClass("add");
    }
} }, t.changeNavSelectedClass = function (e) { this.navSelectedElements.forEach(function (t) { t.classList[e]("is-nav-selected"); }); }, t.activateAsNavFor = function () { this.navCompanionSelect(!0); }, t.removeNavSelectedElements = function () { this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements); }, t.onNavStaticClick = function (t, e, i, n) { "number" == typeof n && this.navCompanion.selectCell(n); }, t.deactivateAsNavFor = function () { this.removeNavSelectedElements(); }, t.destroyAsNavFor = function () { this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion); }, n; }), function (e, i) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (t) { return i(e, t); }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter);
}("undefined" != typeof window ? window : this, function (e, t) { var s = e.jQuery, o = e.console; function r(t, e) { for (var i in e)
    t[i] = e[i]; return t; } var a = Array.prototype.slice; function l(t, e, i) { if (!(this instanceof l))
    return new l(t, e, i); var n = t; "string" == typeof t && (n = document.querySelectorAll(t)), n ? (this.elements = function (t) { return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? a.call(t) : [t]; }(n), this.options = r({}, this.options), "function" == typeof e ? i = e : r(this.options, e), i && this.on("always", i), this.getImages(), s && (this.jqDeferred = new s.Deferred), setTimeout(this.check.bind(this))) : o.error("Bad element for imagesLoaded " + (n || t)); } (l.prototype = Object.create(t.prototype)).options = {}, l.prototype.getImages = function () { this.images = [], this.elements.forEach(this.addElementImages, this); }, l.prototype.addElementImages = function (t) { "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t); var e = t.nodeType; if (e && h[e]) {
    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var s = i[n];
        this.addImage(s);
    }
    if ("string" == typeof this.options.background) {
        var o = t.querySelectorAll(this.options.background);
        for (n = 0; n < o.length; n++) {
            var r = o[n];
            this.addElementBackgroundImages(r);
        }
    }
} }; var h = { 1: !0, 9: !0, 11: !0 }; function i(t) { this.img = t; } function n(t, e) { this.url = t, this.element = e, this.img = new Image; } return l.prototype.addElementBackgroundImages = function (t) { var e = getComputedStyle(t); if (e)
    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
        var s = n && n[2];
        s && this.addBackground(s, t), n = i.exec(e.backgroundImage);
    } }, l.prototype.addImage = function (t) { var e = new i(t); this.images.push(e); }, l.prototype.addBackground = function (t, e) { var i = new n(t, e); this.images.push(i); }, l.prototype.check = function () { var n = this; function e(t, e, i) { setTimeout(function () { n.progress(t, e, i); }); } this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (t) { t.once("progress", e), t.check(); }) : this.complete(); }, l.prototype.progress = function (t, e, i) { this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && o && o.log("progress: " + i, t, e); }, l.prototype.complete = function () { var t = this.hasAnyBroken ? "fail" : "done"; if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
    var e = this.hasAnyBroken ? "reject" : "resolve";
    this.jqDeferred[e](this);
} }, (i.prototype = Object.create(t.prototype)).check = function () { this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src); }, i.prototype.getIsImageComplete = function () { return this.img.complete && this.img.naturalWidth; }, i.prototype.confirm = function (t, e) { this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]); }, i.prototype.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t); }, i.prototype.onload = function () { this.confirm(!0, "onload"), this.unbindEvents(); }, i.prototype.onerror = function () { this.confirm(!1, "onerror"), this.unbindEvents(); }, i.prototype.unbindEvents = function () { this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this); }, (n.prototype = Object.create(i.prototype)).check = function () { this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents()); }, n.prototype.unbindEvents = function () { this.img.removeEventListener("load", this), this.img.removeEventListener("error", this); }, n.prototype.confirm = function (t, e) { this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]); }, l.makeJQueryPlugin = function (t) { (t = t || e.jQuery) && ((s = t).fn.imagesLoaded = function (t, e) { return new l(this, t, e).jqDeferred.promise(s(this)); }); }, l.makeJQueryPlugin(), l; }), function (i, n) { "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (t, e) { return n(i, t, e); }) : "object" == typeof module && module.exports ? module.exports = n(i, require("flickity"), require("imagesloaded")) : i.Flickity = n(i, i.Flickity, i.imagesLoaded); }(window, function (t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function () { this.on("activate", this.imagesLoaded); }, n.imagesLoaded = function () { if (this.options.imagesLoaded) {
        var n = this;
        i(this.slider).on("progress", function (t, e) { var i = n.getParentCell(e.img); n.cellSizeChange(i && i.element), n.options.freeScroll || n.positionSliderAtSelected(); });
    } }, e;
});
/*! QRious v4.0.2 | (C) 2017 Alasdair Mercer | GPL v3 License
Based on jsqrencode | (C) 2010 tz@execpc.com | GPL v3 License
*/
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.QRious = e(); }(this, function () {
    "use strict";
    function t(t, e) { var n; return "function" == typeof Object.create ? n = Object.create(t) : (s.prototype = t, n = new s, s.prototype = null), e && i(!0, n, e), n; }
    function e(e, n, s, r) { var o = this; return "string" != typeof e && (r = s, s = n, n = e, e = null), "function" != typeof n && (r = s, s = n, n = function () { return o.apply(this, arguments); }), i(!1, n, o, r), n.prototype = t(o.prototype, s), n.prototype.constructor = n, n.class_ = e || o.class_, n.super_ = o, n; }
    function i(t, e, i) { for (var n, s, a = 0, h = (i = o.call(arguments, 2)).length; a < h; a++) {
        s = i[a];
        for (n in s)
            t && !r.call(s, n) || (e[n] = s[n]);
    } }
    function n() { }
    var s = function () { }, r = Object.prototype.hasOwnProperty, o = Array.prototype.slice, a = e;
    n.class_ = "Nevis", n.super_ = Object, n.extend = a;
    var h = n, f = h.extend(function (t, e, i) { this.qrious = t, this.element = e, this.element.qrious = t, this.enabled = Boolean(i); }, { draw: function (t) { }, getElement: function () { return this.enabled || (this.enabled = !0, this.render()), this.element; }, getModuleSize: function (t) { var e = this.qrious, i = e.padding || 0, n = Math.floor((e.size - 2 * i) / t.width); return Math.max(1, n); }, getOffset: function (t) { var e = this.qrious, i = e.padding; if (null != i)
            return i; var n = this.getModuleSize(t), s = Math.floor((e.size - n * t.width) / 2); return Math.max(0, s); }, render: function (t) { this.enabled && (this.resize(), this.reset(), this.draw(t)); }, reset: function () { }, resize: function () { } }), c = f.extend({ draw: function (t) { var e, i, n = this.qrious, s = this.getModuleSize(t), r = this.getOffset(t), o = this.element.getContext("2d"); for (o.fillStyle = n.foreground, o.globalAlpha = n.foregroundAlpha, e = 0; e < t.width; e++)
            for (i = 0; i < t.width; i++)
                t.buffer[i * t.width + e] && o.fillRect(s * e + r, s * i + r, s, s); }, reset: function () { var t = this.qrious, e = this.element.getContext("2d"), i = t.size; e.lineWidth = 1, e.clearRect(0, 0, i, i), e.fillStyle = t.background, e.globalAlpha = t.backgroundAlpha, e.fillRect(0, 0, i, i); }, resize: function () { var t = this.element; t.width = t.height = this.qrious.size; } }), u = h.extend(null, { BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28] }), l = h.extend(null, { BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30], FINAL_FORMAT: [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107], LEVELS: { L: 1, M: 2, Q: 3, H: 4 } }), _ = h.extend(null, { EXPONENT: [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0], LOG: [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175] }), d = h.extend(null, { BLOCK: [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177] }), v = h.extend(function (t) { var e, i, n, s, r, o = t.value.length; for (this._badness = [], this._level = l.LEVELS[t.level], this._polynomial = [], this._value = t.value, this._version = 0, this._stringBuffer = []; this._version < 40 && (this._version++, n = 4 * (this._level - 1) + 16 * (this._version - 1), s = l.BLOCKS[n++], r = l.BLOCKS[n++], e = l.BLOCKS[n++], i = l.BLOCKS[n], n = e * (s + r) + r - 3 + (this._version <= 9), !(o <= n));)
        ; this._dataBlock = e, this._eccBlock = i, this._neccBlock1 = s, this._neccBlock2 = r; var a = this.width = 17 + 4 * this._version; this.buffer = v._createArray(a * a), this._ecc = v._createArray(e + (e + i) * (s + r) + r), this._mask = v._createArray((a * (a + 1) + 1) / 2), this._insertFinders(), this._insertAlignments(), this.buffer[8 + a * (a - 8)] = 1, this._insertTimingGap(), this._reverseMask(), this._insertTimingRowAndColumn(), this._insertVersion(), this._syncMask(), this._convertBitStream(o), this._calculatePolynomial(), this._appendEccToData(), this._interleaveBlocks(), this._pack(), this._finish(); }, { _addAlignment: function (t, e) { var i, n = this.buffer, s = this.width; for (n[t + s * e] = 1, i = -2; i < 2; i++)
            n[t + i + s * (e - 2)] = 1, n[t - 2 + s * (e + i + 1)] = 1, n[t + 2 + s * (e + i)] = 1, n[t + i + 1 + s * (e + 2)] = 1; for (i = 0; i < 2; i++)
            this._setMask(t - 1, e + i), this._setMask(t + 1, e - i), this._setMask(t - i, e - 1), this._setMask(t + i, e + 1); }, _appendData: function (t, e, i, n) { var s, r, o, a = this._polynomial, h = this._stringBuffer; for (r = 0; r < n; r++)
            h[i + r] = 0; for (r = 0; r < e; r++) {
            if (255 !== (s = _.LOG[h[t + r] ^ h[i]]))
                for (o = 1; o < n; o++)
                    h[i + o - 1] = h[i + o] ^ _.EXPONENT[v._modN(s + a[n - o])];
            else
                for (o = i; o < i + n; o++)
                    h[o] = h[o + 1];
            h[i + n - 1] = 255 === s ? 0 : _.EXPONENT[v._modN(s + a[0])];
        } }, _appendEccToData: function () { var t, e = 0, i = this._dataBlock, n = this._calculateMaxLength(), s = this._eccBlock; for (t = 0; t < this._neccBlock1; t++)
            this._appendData(e, i, n, s), e += i, n += s; for (t = 0; t < this._neccBlock2; t++)
            this._appendData(e, i + 1, n, s), e += i + 1, n += s; }, _applyMask: function (t) { var e, i, n, s, r = this.buffer, o = this.width; switch (t) {
            case 0:
                for (s = 0; s < o; s++)
                    for (n = 0; n < o; n++)
                        n + s & 1 || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 1:
                for (s = 0; s < o; s++)
                    for (n = 0; n < o; n++)
                        1 & s || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 2:
                for (s = 0; s < o; s++)
                    for (e = 0, n = 0; n < o; n++, e++)
                        3 === e && (e = 0), e || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 3:
                for (i = 0, s = 0; s < o; s++, i++)
                    for (3 === i && (i = 0), e = i, n = 0; n < o; n++, e++)
                        3 === e && (e = 0), e || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 4:
                for (s = 0; s < o; s++)
                    for (e = 0, i = s >> 1 & 1, n = 0; n < o; n++, e++)
                        3 === e && (e = 0, i = !i), i || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 5:
                for (i = 0, s = 0; s < o; s++, i++)
                    for (3 === i && (i = 0), e = 0, n = 0; n < o; n++, e++)
                        3 === e && (e = 0), (n & s & 1) + !(!e | !i) || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 6:
                for (i = 0, s = 0; s < o; s++, i++)
                    for (3 === i && (i = 0), e = 0, n = 0; n < o; n++, e++)
                        3 === e && (e = 0), (n & s & 1) + (e && e === i) & 1 || this._isMasked(n, s) || (r[n + s * o] ^= 1);
                break;
            case 7: for (i = 0, s = 0; s < o; s++, i++)
                for (3 === i && (i = 0), e = 0, n = 0; n < o; n++, e++)
                    3 === e && (e = 0), (e && e === i) + (n + s & 1) & 1 || this._isMasked(n, s) || (r[n + s * o] ^= 1);
        } }, _calculateMaxLength: function () { return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2; }, _calculatePolynomial: function () { var t, e, i = this._eccBlock, n = this._polynomial; for (n[0] = 1, t = 0; t < i; t++) {
            for (n[t + 1] = 1, e = t; e > 0; e--)
                n[e] = n[e] ? n[e - 1] ^ _.EXPONENT[v._modN(_.LOG[n[e]] + t)] : n[e - 1];
            n[0] = _.EXPONENT[v._modN(_.LOG[n[0]] + t)];
        } for (t = 0; t <= i; t++)
            n[t] = _.LOG[n[t]]; }, _checkBadness: function () { var t, e, i, n, s, r = 0, o = this._badness, a = this.buffer, h = this.width; for (s = 0; s < h - 1; s++)
            for (n = 0; n < h - 1; n++)
                (a[n + h * s] && a[n + 1 + h * s] && a[n + h * (s + 1)] && a[n + 1 + h * (s + 1)] || !(a[n + h * s] || a[n + 1 + h * s] || a[n + h * (s + 1)] || a[n + 1 + h * (s + 1)])) && (r += v.N2); var f = 0; for (s = 0; s < h; s++) {
            for (i = 0, o[0] = 0, t = 0, n = 0; n < h; n++)
                t === (e = a[n + h * s]) ? o[i]++ : o[++i] = 1, f += (t = e) ? 1 : -1;
            r += this._getBadness(i);
        } f < 0 && (f = -f); var c = 0, u = f; for (u += u << 2, u <<= 1; u > h * h;)
            u -= h * h, c++; for (r += c * v.N4, n = 0; n < h; n++) {
            for (i = 0, o[0] = 0, t = 0, s = 0; s < h; s++)
                t === (e = a[n + h * s]) ? o[i]++ : o[++i] = 1, t = e;
            r += this._getBadness(i);
        } return r; }, _convertBitStream: function (t) { var e, i, n = this._ecc, s = this._version; for (i = 0; i < t; i++)
            n[i] = this._value.charCodeAt(i); var r = this._stringBuffer = n.slice(), o = this._calculateMaxLength(); t >= o - 2 && (t = o - 2, s > 9 && t--); var a = t; if (s > 9) {
            for (r[a + 2] = 0, r[a + 3] = 0; a--;)
                e = r[a], r[a + 3] |= 255 & e << 4, r[a + 2] = e >> 4;
            r[2] |= 255 & t << 4, r[1] = t >> 4, r[0] = 64 | t >> 12;
        }
        else {
            for (r[a + 1] = 0, r[a + 2] = 0; a--;)
                e = r[a], r[a + 2] |= 255 & e << 4, r[a + 1] = e >> 4;
            r[1] |= 255 & t << 4, r[0] = 64 | t >> 4;
        } for (a = t + 3 - (s < 10); a < o;)
            r[a++] = 236, r[a++] = 17; }, _getBadness: function (t) { var e, i = 0, n = this._badness; for (e = 0; e <= t; e++)
            n[e] >= 5 && (i += v.N1 + n[e] - 5); for (e = 3; e < t - 1; e += 2)
            n[e - 2] === n[e + 2] && n[e + 2] === n[e - 1] && n[e - 1] === n[e + 1] && 3 * n[e - 1] === n[e] && (0 === n[e - 3] || e + 3 > t || 3 * n[e - 3] >= 4 * n[e] || 3 * n[e + 3] >= 4 * n[e]) && (i += v.N3); return i; }, _finish: function () { this._stringBuffer = this.buffer.slice(); var t, e, i = 0, n = 3e4; for (e = 0; e < 8 && (this._applyMask(e), (t = this._checkBadness()) < n && (n = t, i = e), 7 !== i); e++)
            this.buffer = this._stringBuffer.slice(); i !== e && this._applyMask(i), n = l.FINAL_FORMAT[i + (this._level - 1 << 3)]; var s = this.buffer, r = this.width; for (e = 0; e < 8; e++, n >>= 1)
            1 & n && (s[r - 1 - e + 8 * r] = 1, e < 6 ? s[8 + r * e] = 1 : s[8 + r * (e + 1)] = 1); for (e = 0; e < 7; e++, n >>= 1)
            1 & n && (s[8 + r * (r - 7 + e)] = 1, e ? s[6 - e + 8 * r] = 1 : s[7 + 8 * r] = 1); }, _interleaveBlocks: function () { var t, e, i = this._dataBlock, n = this._ecc, s = this._eccBlock, r = 0, o = this._calculateMaxLength(), a = this._neccBlock1, h = this._neccBlock2, f = this._stringBuffer; for (t = 0; t < i; t++) {
            for (e = 0; e < a; e++)
                n[r++] = f[t + e * i];
            for (e = 0; e < h; e++)
                n[r++] = f[a * i + t + e * (i + 1)];
        } for (e = 0; e < h; e++)
            n[r++] = f[a * i + t + e * (i + 1)]; for (t = 0; t < s; t++)
            for (e = 0; e < a + h; e++)
                n[r++] = f[o + t + e * s]; this._stringBuffer = n; }, _insertAlignments: function () { var t, e, i, n = this._version, s = this.width; if (n > 1)
            for (t = u.BLOCK[n], i = s - 7;;) {
                for (e = s - 7; e > t - 3 && (this._addAlignment(e, i), !(e < t));)
                    e -= t;
                if (i <= t + 9)
                    break;
                i -= t, this._addAlignment(6, i), this._addAlignment(i, 6);
            } }, _insertFinders: function () { var t, e, i, n, s = this.buffer, r = this.width; for (t = 0; t < 3; t++) {
            for (e = 0, n = 0, 1 === t && (e = r - 7), 2 === t && (n = r - 7), s[n + 3 + r * (e + 3)] = 1, i = 0; i < 6; i++)
                s[n + i + r * e] = 1, s[n + r * (e + i + 1)] = 1, s[n + 6 + r * (e + i)] = 1, s[n + i + 1 + r * (e + 6)] = 1;
            for (i = 1; i < 5; i++)
                this._setMask(n + i, e + 1), this._setMask(n + 1, e + i + 1), this._setMask(n + 5, e + i), this._setMask(n + i + 1, e + 5);
            for (i = 2; i < 4; i++)
                s[n + i + r * (e + 2)] = 1, s[n + 2 + r * (e + i + 1)] = 1, s[n + 4 + r * (e + i)] = 1, s[n + i + 1 + r * (e + 4)] = 1;
        } }, _insertTimingGap: function () { var t, e, i = this.width; for (e = 0; e < 7; e++)
            this._setMask(7, e), this._setMask(i - 8, e), this._setMask(7, e + i - 7); for (t = 0; t < 8; t++)
            this._setMask(t, 7), this._setMask(t + i - 8, 7), this._setMask(t, i - 8); }, _insertTimingRowAndColumn: function () { var t, e = this.buffer, i = this.width; for (t = 0; t < i - 14; t++)
            1 & t ? (this._setMask(8 + t, 6), this._setMask(6, 8 + t)) : (e[8 + t + 6 * i] = 1, e[6 + i * (8 + t)] = 1); }, _insertVersion: function () { var t, e, i, n, s = this.buffer, r = this._version, o = this.width; if (r > 6)
            for (t = d.BLOCK[r - 7], e = 17, i = 0; i < 6; i++)
                for (n = 0; n < 3; n++, e--)
                    1 & (e > 11 ? r >> e - 12 : t >> e) ? (s[5 - i + o * (2 - n + o - 11)] = 1, s[2 - n + o - 11 + o * (5 - i)] = 1) : (this._setMask(5 - i, 2 - n + o - 11), this._setMask(2 - n + o - 11, 5 - i)); }, _isMasked: function (t, e) { var i = v._getMaskBit(t, e); return 1 === this._mask[i]; }, _pack: function () { var t, e, i, n = 1, s = 1, r = this.width, o = r - 1, a = r - 1, h = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2; for (e = 0; e < h; e++)
            for (t = this._stringBuffer[e], i = 0; i < 8; i++, t <<= 1) {
                128 & t && (this.buffer[o + r * a] = 1);
                do {
                    s ? o-- : (o++, n ? 0 !== a ? a-- : (n = !n, 6 === (o -= 2) && (o--, a = 9)) : a !== r - 1 ? a++ : (n = !n, 6 === (o -= 2) && (o--, a -= 8))), s = !s;
                } while (this._isMasked(o, a));
            } }, _reverseMask: function () { var t, e, i = this.width; for (t = 0; t < 9; t++)
            this._setMask(t, 8); for (t = 0; t < 8; t++)
            this._setMask(t + i - 8, 8), this._setMask(8, t); for (e = 0; e < 7; e++)
            this._setMask(8, e + i - 7); }, _setMask: function (t, e) { var i = v._getMaskBit(t, e); this._mask[i] = 1; }, _syncMask: function () { var t, e, i = this.width; for (e = 0; e < i; e++)
            for (t = 0; t <= e; t++)
                this.buffer[t + i * e] && this._setMask(t, e); } }, { _createArray: function (t) { var e, i = []; for (e = 0; e < t; e++)
            i[e] = 0; return i; }, _getMaskBit: function (t, e) { var i; return t > e && (i = t, t = e, e = i), i = e, i += e * e, i >>= 1, i += t; }, _modN: function (t) { for (; t >= 255;)
            t = ((t -= 255) >> 8) + (255 & t); return t; }, N1: 3, N2: 3, N3: 40, N4: 10 }), p = v, m = f.extend({ draw: function () { this.element.src = this.qrious.toDataURL(); }, reset: function () { this.element.src = ""; }, resize: function () { var t = this.element; t.width = t.height = this.qrious.size; } }), g = h.extend(function (t, e, i, n) { this.name = t, this.modifiable = Boolean(e), this.defaultValue = i, this._valueTransformer = n; }, { transform: function (t) { var e = this._valueTransformer; return "function" == typeof e ? e(t, this) : t; } }), k = h.extend(null, { abs: function (t) { return null != t ? Math.abs(t) : null; }, hasOwn: function (t, e) { return Object.prototype.hasOwnProperty.call(t, e); }, noop: function () { }, toUpperCase: function (t) { return null != t ? t.toUpperCase() : null; } }), w = h.extend(function (t) { this.options = {}, t.forEach(function (t) { this.options[t.name] = t; }, this); }, { exists: function (t) { return null != this.options[t]; }, get: function (t, e) { return w._get(this.options[t], e); }, getAll: function (t) { var e, i = this.options, n = {}; for (e in i)
            k.hasOwn(i, e) && (n[e] = w._get(i[e], t)); return n; }, init: function (t, e, i) { "function" != typeof i && (i = k.noop); var n, s; for (n in this.options)
            k.hasOwn(this.options, n) && (s = this.options[n], w._set(s, s.defaultValue, e), w._createAccessor(s, e, i)); this._setAll(t, e, !0); }, set: function (t, e, i) { return this._set(t, e, i); }, setAll: function (t, e) { return this._setAll(t, e); }, _set: function (t, e, i, n) { var s = this.options[t]; if (!s)
            throw new Error("Invalid option: " + t); if (!s.modifiable && !n)
            throw new Error("Option cannot be modified: " + t); return w._set(s, e, i); }, _setAll: function (t, e, i) { if (!t)
            return !1; var n, s = !1; for (n in t)
            k.hasOwn(t, n) && this._set(n, t[n], e, i) && (s = !0); return s; } }, { _createAccessor: function (t, e, i) { var n = { get: function () { return w._get(t, e); } }; t.modifiable && (n.set = function (n) { w._set(t, n, e) && i(n, t); }), Object.defineProperty(e, t.name, n); }, _get: function (t, e) { return e["_" + t.name]; }, _set: function (t, e, i) { var n = "_" + t.name, s = i[n], r = t.transform(null != e ? e : t.defaultValue); return i[n] = r, r !== s; } }), M = w, b = h.extend(function () { this._services = {}; }, { getService: function (t) { var e = this._services[t]; if (!e)
            throw new Error("Service is not being managed with name: " + t); return e; }, setService: function (t, e) { if (this._services[t])
            throw new Error("Service is already managed with name: " + t); e && (this._services[t] = e); } }), B = new M([new g("background", !0, "white"), new g("backgroundAlpha", !0, 1, k.abs), new g("element"), new g("foreground", !0, "black"), new g("foregroundAlpha", !0, 1, k.abs), new g("level", !0, "L", k.toUpperCase), new g("mime", !0, "image/png"), new g("padding", !0, null, k.abs), new g("size", !0, 100, k.abs), new g("value", !0, "")]), y = new b, O = h.extend(function (t) { B.init(t, this, this.update.bind(this)); var e = B.get("element", this), i = y.getService("element"), n = e && i.isCanvas(e) ? e : i.createCanvas(), s = e && i.isImage(e) ? e : i.createImage(); this._canvasRenderer = new c(this, n, !0), this._imageRenderer = new m(this, s, s === e), this.update(); }, { get: function () { return B.getAll(this); }, set: function (t) { B.setAll(t, this) && this.update(); }, toDataURL: function (t) { return this.canvas.toDataURL(t || this.mime); }, update: function () { var t = new p({ level: this.level, value: this.value }); this._canvasRenderer.render(t), this._imageRenderer.render(t); } }, { use: function (t) { y.setService(t.getName(), t); } });
    Object.defineProperties(O.prototype, { canvas: { get: function () { return this._canvasRenderer.getElement(); } }, image: { get: function () { return this._imageRenderer.getElement(); } } });
    var A = O, L = h.extend({ getName: function () { } }).extend({ createCanvas: function () { }, createImage: function () { }, getName: function () { return "element"; }, isCanvas: function (t) { }, isImage: function (t) { } }).extend({ createCanvas: function () { return document.createElement("canvas"); }, createImage: function () { return document.createElement("img"); }, isCanvas: function (t) { return t instanceof HTMLCanvasElement; }, isImage: function (t) { return t instanceof HTMLImageElement; } });
    return A.use(new L), A;
});
