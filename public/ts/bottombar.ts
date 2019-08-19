///<reference path="commons.ts" />

interface PageAction {
	icon?: string;
	element?: HTMLElement;
	callback: (this: HTMLElement, event: Event) => any;
	onCreate?: (elem: HTMLElement) => any;
}

class BottomBar {
	actionsContainer: HTMLElement;

	constructor(public element: HTMLElement) {
		this.actionsContainer = <HTMLElement>querySelectorOrThrow(".right", true);
		element.querySelectorOrThrow(".close", true).addEventListener("click", function () {
			pages.back();
		});
	}

	show(actions?: PageAction[]): void {
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

				} else if (typeof action.element == "object") {
					elem = action.element;
				} else {
					console.error("Ignoring unsupported action ", action);
					continue;
				}

				var btn = document.createElement("div");
				btn.className = "action" + (typeof action.icon == "string" ? " icon" : "");
				btn.appendChild(elem);
				if (action.callback)
					btn.addEventListener("click", <any>action.callback);
				if (action.onCreate)
					action.onCreate(btn);
				this.actionsContainer.appendChild(btn);
			}
		}
	}

	hide(): void {
		this.element.classList.add("hidden");
	}
}

const bottomBar = new BottomBar(document.querySelector(".bottombar") || document.createElement("div"));
