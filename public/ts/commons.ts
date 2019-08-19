function querySelectorOrThrow(this: any, selector: string, message: boolean = false): Element {
	const ret = ((typeof this == "object" && this instanceof Element) ? this : document).querySelector(selector);
	if (ret === null) {
		if (message)
			alert("Failed finding element " + selector);
		throw new Error("Failed finding element " + selector);
	} else {
		return ret;
	}
}

interface Element {
	querySelectorOrThrow(selector: string, message?: boolean): Element;
}

Element.prototype.querySelectorOrThrow = querySelectorOrThrow;

interface Navigator {
	share(data: {
		title?: string,
		text?: string,
		url?: string,
	}): void;
}


// HTML parser & sanitizer
function insertHTMLInto(htmlText: string, elem: HTMLElement): void {
	let footnote = new DOMParser().parseFromString(htmlText, "text/html").body;
	function filterHTMLElement(elem: Node): Node | undefined {
		let tag = "";
		if (!elem) return undefined;
		if (elem.nodeType == Node.TEXT_NODE) {
			if (elem.textContent)
				return document.createTextNode(elem.textContent);
			else
				return undefined;
		} else if (elem.nodeType == Node.ELEMENT_NODE && elem instanceof Element) {
			if (["SMALL", "P", "DIV", "A"].indexOf(elem.tagName) != -1) {
				tag = elem.tagName;
			} else {
				if (elem.textContent)
					return document.createTextNode(elem.textContent);
				else
					return undefined;
			}

			let ret = document.createElement(tag);
			let allowedAttrs: { [index: string]: string[] } = {
				A: ["href", "tabindex"]
			}
			let attrs = allowedAttrs[tag];
			if (attrs) {
				for (let i = 0; i < attrs.length; i++) {
					let attr = elem.getAttribute(attrs[i]);
					if (attr !== null)
						ret.setAttribute(attrs[i], attr);
				}
			}

			if (tag == "A") {
				ret.setAttribute("target", "_blank");
			}

			let val: Node | undefined;
			for (let i = 0; i < elem.childNodes.length; i++) {
				if (val = filterHTMLElement(elem.childNodes[i]))
					ret.appendChild(val);
			}
			return ret;
		} else {
			return undefined;
		}
	}
	let val: Node | undefined;
	for (let i = 0; i < footnote.children.length; i++)
		if (val = filterHTMLElement(footnote.childNodes[i]))
			elem.appendChild(val);
}
