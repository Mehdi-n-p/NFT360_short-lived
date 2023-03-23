<template>
	<div id="list" class="list">
		<transition name="fade">
			<div v-if="!treemapStore.loading">
				<table v-if="treemapStore.listData.length > 0">
					<thead>
						<tr>
							<th
								v-for="column in columns"
								:key="column.id"
								:class="[
									treemapStore.sortKey === column.id && 'text-white',
									column.sortable && 'pointer',
								]"
								@click="
									column.sortable &&
										((treemapStore.sortKey = column.id),
										(treemapStore.sortDirection =
											treemapStore.sortDirection * -1))
								"
							>
								<div class="flex">
									<span v-if="column.name === 'Volume'"
										>Volume {{ treemapStore.timeText }} &nbsp;</span
									>
									<span v-else>{{ column.name }} &nbsp;</span>
									<span
										v-if="column.sortable && treemapStore.sortDirection === 1"
										:style="`color: ${
											treemapStore.sortKey === column.id ? 'white' : 'black'
										};`"
									>
										&darr;
									</span>
									<span
										v-else-if="
											column.sortable && treemapStore.sortDirection === -1
										"
										:style="`color: ${
											treemapStore.sortKey === column.id ? 'white' : 'black'
										};`"
									>
										&uarr;
									</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in treemapStore.listData" :key="item.name">
							<td class="td_position">#{{ item.position }}</td>
							<td>
								<div
									class="avatar"
									:class="{
										square_default: item['img' + treemapStore.imgNum] === null,
									}"
									:style="`background-image: url('${
										item['img' + treemapStore.imgNum]
									}');`"
								/>
							</td>
							<td class="td_name">
								<a :href="`/collection/${item.slug}`">
									{{ item.name }}
								</a>
							</td>
							<td>
								{{ item["volume_" + treemapStore.timeInterval].toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td>
								{{ item["total_sales_" + treemapStore.timeInterval] }}
							</td>
							<td>
								{{ item["floor_price_" + treemapStore.timeInterval].toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td>
								{{ item["ceiling"].toFixed(2) }}
							</td>
							<td>
								{{ item["average_" + treemapStore.timeInterval].toFixed(2) }}
							</td>
						</tr>
					</tbody>
				</table>
				<div v-else>No data</div>
			</div>
			<div v-else id="list_loading" class="list_loading">Loading...</div>
		</transition>
	</div>
</template>

<script setup>
import { useTreemapStore } from "@/stores/treemap";

const treemapStore = useTreemapStore();

const columns = [
	{ name: "Position", id: "position", sortable: true },
	{ name: "Image", id: "image", sortable: false },
	{ name: "Name", id: "name", sortable: false },
	{ name: "Volume", id: "volume_" + treemapStore.timeInterval, sortable: true },
	{ name: "Sales", id: "total_sales_" + treemapStore.timeInterval, sortable: true },
	{ name: "Floor", id: "floor_price_" + treemapStore.timeInterval, sortable: true },
	{ name: "Ceiling", id: "ceiling", sortable: true },
	{ name: "Average", id: "average_" + treemapStore.timeInterval, sortable: true },
];
</script>

<style lang="scss" scoped>
#list {
	padding-top: 70px;
	background: #f3f3f3;
	width: 100%;
	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		tr {
			border-bottom: 1px solid #ccc;
			td a {
				color: #000;
				text-decoration: none;
			}
		}
		thead {
			background: #000;
			color: #fff;
			font-weight: 300;
			th {
				border: none;
				text-align: left;
				font-weight: 300;
				padding: 15px 20px;
			}
		}
		.square_default {
			background-image: url("/src/assets/img/nft_default.png") !important;
		}
		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 3px;
			background-size: cover;
		}
	}
}

#list table tr td,
#list table thead th {
	border-bottom: 2px solid #dbdee7;
	padding: 10px 20px;
	vertical-align: middle;
}

#list table tr td:first-of-type,
#list table tr th:first-of-type {
	padding-left: 50px;
}

#list table tr td:last-of-type {
	padding-right: 50px;
}

#list table tr td.td_name {
	font-weight: 600;
}

i.eth {
	display: inline-block;
	background: url("/src/assets/img/eth_black.svg") no-repeat;
	width: 12px;
	height: 12px;
}

.pointer {
	cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

.list_loading {
	width: 100%;
	height: 100vh;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	background: #f3f3f3;
	font-size: 2em;
}
</style>
