var meta = {
	data: <{ [index: string]: object[] } | null>null,
	required: ["productCategories"],
	async getData(): Promise<{ [index: string]: object[] }> {
		if (this.data)
			return this.data;
		else
			return this.data = await api.getFlags(this.required);
	},
	/**
	 * @returns {Promise<{ id: number, image: { url: string }, title: string, color: string, icon: { url: string } }[]>}
	 */
	async getProductCategories(): Promise<object[]> {
		const data = await this.getData();
		// duplicate data
		return JSON.parse(JSON.stringify(data["productCategories"]));
	}
};
