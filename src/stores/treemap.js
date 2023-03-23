import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useTreemapStore = defineStore("treemap", {
	state: () => ({
		data: [],
		width: 0,
		height: 0,
		loading: false,
		timeInterval: "one_day",
		timeText: "1 day",
		blockchainType: "Ethereum",
		imgNum: 1,
		view: "treemap",
		sortKey: "volume_one_day",
		sortDirection: -1,
		show: "all",
	}),
	getters: {
		squarifyData(state) {
			// Filter list by blockchain
			let data =
				state.blockchainType !== "All"
					? state.data.filter((item) => item.blockchain === state.blockchainType)
					: state.data;

			// Remove duplicate entries
			/*
			 * TODO => Remove after API Fixed
			 */
			// data = [...new Map(data.map(v => [v.name, v])).values()]

			if (state.show === "up") {
				// Remove negative values
				data = data.filter((obj) => obj["floor_price_change_" + state.timeInterval] > 0);
				// Sort data by floor_price_change
				data.sort(function (a, b) {
					return (
						b["floor_price_change_" + state.timeInterval] -
						a["floor_price_change_" + state.timeInterval]
					);
				});
				// Add value property
				data.map((obj) => (obj["value"] = obj["floor_price_change_" + state.timeInterval]));
			} else if (state.show === "down") {
				// Remove positive values
				data = data.filter((obj) => obj["floor_price_change_" + state.timeInterval] < 0);
				// Sort data by floor_price_change
				data.sort(function (a, b) {
					return (
						a["floor_price_change_" + state.timeInterval] -
						b["floor_price_change_" + state.timeInterval]
					);
				});
				// Add value property (*(-1) : we want positive number for squarify value)
				data.map(
					(obj) => (obj["value"] = obj["floor_price_change_" + state.timeInterval] * -1)
				);
			} else if (state.show === "all") {
				// Sort data by volume
				data.sort(function (a, b) {
					return b["volume_" + state.timeInterval] - a["volume_" + state.timeInterval];
				});
				// Add value property
				data.map((obj) => (obj["value"] = obj["volume_" + state.timeInterval]));
			}

			if (data.length > 0 && state.width && state.height) {
				return Treemap.getTreemap({
					data: data,
					width: state.width,
					height: state.height,
				});
			} else {
				return [];
			}
		},
		listData: (state) => {
			// Filter list by blockchain
			let data =
				state.blockchainType !== "All"
					? state.data.filter((item) => item.blockchain === state.blockchainType)
					: state.data;

			// Remove duplicate entries
			/*
			 * TODO => Remove after API Fixed
			 */
			// data = [...new Map(data.map(v => [v.name, v])).values()]

			// Sort list
			data.sort((a, b) => {
				if (state.sortDirection === -1) {
					return b[state.sortKey] - a[state.sortKey];
				} else if (state.sortDirection === 1) {
					return a[state.sortKey] - b[state.sortKey];
				}
			});

			return data;
		},
		collectionData: (state) => {
			const router = useRouter();
			let slug = router.currentRoute.value.fullPath.split("/").pop();
			// Filter list by slug
			let data = state.data.filter((item) => item.slug === slug);

			return data;
		},
	},
	actions: {
		async getData() {
			this.loading = true;

			const treemapData = await fetch(`https://nftnft.ovh/${this.timeInterval}`);
			const dataJSON = await treemapData.json();

			this.data = dataJSON;

			this.loading = false;
		},
	},
});
