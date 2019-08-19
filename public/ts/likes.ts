const likes = {
	data: <{ [index: string]: boolean } | null>null,
	load(): void {
		var str = window.localStorage.getItem("likes");
		if (str && str[0] == '{')
			this.data = JSON.parse(str);
		else
			this.data = {};
	},
	save(): void {
		window.localStorage.setItem("likes", JSON.stringify(this.data));
	},
	check(id: number | string): boolean {
		id = id.toString();
		if (this.data == null)
			this.load();
		return !!this.data![id];
	},
	toggle(id: number | string): boolean {
		id = id.toString();
		var val = !this.check(id);
		this.set(id, val);
		return val;
	},
	set(id: number | string, liked: boolean): void {
		id = id.toString();
		if (this.data == null)
			this.load();
		this.data![id] = liked;
		this.save();
	},
	getIds(): number[] {
		if (this.data == null)
			this.load();
		var ids: number[] = [];
		for (var key in this.data) {
			if (this.data.hasOwnProperty(key) && this.data[key]) {
				ids.push(parseInt(key));
			}
		}
		return ids;
	}
};