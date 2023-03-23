<template>
	<div class="collection" v-if="!treemapStore.loading">
		<div v-if="treemapStore.collectionData.length > 0" class="wrapper_collection">
			<div
				class="banner"
				:style="`background-image: url('${treemapStore.collectionData[0].opensea_banner}')`"
			></div>
			<div class="infos_wrapper">
				<div class="head">
					<div class="title">
						<h1>
							{{ treemapStore.collectionData[0].name }}
						</h1>
					</div>
					<div class="socials">
						<a
							v-if="
								treemapStore.collectionData[0].address !== null &&
								treemapStore.collectionData[0].token_standard === 'ERC721'
							"
							:href="`https://etherscan.io/address/${treemapStore.collectionData[0].address}`"
							target="_blank"
							rel="noopener"
						>
							Etherscan
						</a>
						<a
							v-if="treemapStore.collectionData[0].external_url !== null"
							:href="`${treemapStore.collectionData[0].external_url}`"
							target="_blank"
							rel="noopener"
						>
							Website
						</a>
						<a
							v-if="treemapStore.collectionData[0].instagram_username !== null"
							:href="`https://www.instagram.com/${treemapStore.collectionData[0].instagram_username}`"
							target="_blank"
							rel="noopener"
						>
							Instagram
						</a>
						<a
							v-if="treemapStore.collectionData[0].twitter_username !== null"
							:href="`https://twitter.com/${treemapStore.collectionData[0].twitter_username}`"
							target="_blank"
							rel="noopener"
						>
							Twitter
						</a>
						<a
							v-if="treemapStore.collectionData[0].discord_url !== null"
							:href="`${treemapStore.collectionData[0].discord_url}`"
							target="_blank"
							rel="noopener"
						>
							Discord
						</a>
						<a
							v-if="treemapStore.collectionData[0].telegram_url !== null"
							:href="`${treemapStore.collectionData[0].telegram_url}`"
							target="_blank"
							rel="noopener"
						>
							Telegram
						</a>
						<a
							v-if="treemapStore.collectionData[0].wiki_url !== null"
							:href="`${treemapStore.collectionData[0].wiki_url}`"
							target="_blank"
							rel="noopener"
						>
							Wiki
						</a>
						<a
							v-if="treemapStore.collectionData[0].opensea_url !== null"
							:href="`${treemapStore.collectionData[0].opensea_url}`"
							target="_blank"
							rel="noopener"
						>
							Opensea
						</a>
						<a
							v-if="treemapStore.collectionData[0].looksrare_url !== null"
							:href="`${treemapStore.collectionData[0].looksrare_url}`"
							target="_blank"
							rel="noopener"
						>
							Looksrare
						</a>
					</div>
				</div>
				<div class="infos">
					<span v-if="treemapStore.collectionData[0].blockchain !== null">
						Blockchain : {{ treemapStore.collectionData[0].blockchain }}
					</span>
					<span v-if="treemapStore.collectionData[0].symbol !== null">
						Symbol : {{ treemapStore.collectionData[0].symbol }}
					</span>
				</div>
				<div v-if="treemapStore.collectionData[0].blockchain !== null" class="description">
					<h2>{{ treemapStore.collectionData[0].name }} NFT Collection</h2>
					{{ treemapStore.collectionData[0].description }}
				</div>
				<div class="stats">
					<div v-if="treemapStore.collectionData[0].total_supply !== null" class="stat">
						<div class="stat_nb">
							{{ treemapStore.collectionData[0].total_supply }}
						</div>
						<div class="stat_desc">Tokens</div>
					</div>
					<div
						v-if="treemapStore.collectionData[0].number_of_owners !== null"
						class="stat"
					>
						<div class="stat_nb">
							{{ treemapStore.collectionData[0].number_of_owners }}
						</div>
						<div class="stat_desc">Owners</div>
					</div>
					<div v-if="treemapStore.collectionData[0].unique_owners !== null" class="stat">
						<div class="stat_nb">
							{{ treemapStore.collectionData[0].unique_owners }}%
						</div>
						<div class="stat_desc">Unique owners</div>
					</div>
				</div>
				<div class="gallery">
					<div v-if="treemapStore.collectionData[0].img1 !== null" class="gallery_item">
						<img :src="`${treemapStore.collectionData[0].img1}`" />
					</div>
					<div v-if="treemapStore.collectionData[0].img2 !== null" class="gallery_item">
						<img :src="`${treemapStore.collectionData[0].img2}`" />
					</div>
					<div v-if="treemapStore.collectionData[0].img3 !== null" class="gallery_item">
						<img :src="`${treemapStore.collectionData[0].img3}`" />
					</div>
					<div v-if="treemapStore.collectionData[0].img4 !== null" class="gallery_item">
						<img :src="`${treemapStore.collectionData[0].img4}`" />
					</div>
					<div v-if="treemapStore.collectionData[0].img5 !== null" class="gallery_item">
						<img :src="`${treemapStore.collectionData[0].img5}`" />
					</div>
				</div>
				<div v-if="treemapStore.collectionData[0].address !== null" class="address">
					<label for="address">Address</label>
					<input
						:value="treemapStore.collectionData[0].address"
						type="text"
						name="address"
						id="address"
					/>
					<button @click="address()" id="buttonAddress">Copy</button>
				</div>
				<h3>{{ treemapStore.collectionData[0].name }} NFT Stats</h3>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>1h</th>
							<th>12h</th>
							<th>1 day</th>
							<th>7 days</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Volume</td>
							<td v-if="treemapStore.collectionData[0].volume_one_hour !== null">
								{{ treemapStore.collectionData[0].volume_one_hour.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].volume_twelve_hours !== null">
								{{ treemapStore.collectionData[0].volume_twelve_hours.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].volume_one_day !== null">
								{{ treemapStore.collectionData[0].volume_one_day.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].volume_seven_days !== null">
								{{ treemapStore.collectionData[0].volume_seven_days.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
						</tr>
						<tr>
							<td>Floor</td>
							<td v-if="treemapStore.collectionData[0].floor_price_one_hour !== null">
								{{ treemapStore.collectionData[0].floor_price_one_hour.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td
								v-if="
									treemapStore.collectionData[0].floor_price_twelve_hours !== null
								"
							>
								{{
									treemapStore.collectionData[0].floor_price_twelve_hours.toFixed(
										2
									)
								}}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].floor_price_one_day !== null">
								{{ treemapStore.collectionData[0].floor_price_one_day.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td
								v-if="
									treemapStore.collectionData[0].floor_price_seven_days !== null
								"
							>
								{{
									treemapStore.collectionData[0].floor_price_seven_days.toFixed(2)
								}}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
						</tr>
						<tr>
							<td>Sales</td>
							<td v-if="treemapStore.collectionData[0].total_sales_one_hour !== null">
								{{ treemapStore.collectionData[0].total_sales_one_hour }}
							</td>
							<td v-else>-</td>
							<td
								v-if="
									treemapStore.collectionData[0].total_sales_twelve_hours !== null
								"
							>
								{{ treemapStore.collectionData[0].total_sales_twelve_hours }}
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].total_sales_one_day !== null">
								{{ treemapStore.collectionData[0].total_sales_one_day }}
							</td>
							<td v-else>-</td>
							<td
								v-if="
									treemapStore.collectionData[0].total_sales_seven_days !== null
								"
							>
								{{ treemapStore.collectionData[0].total_sales_seven_days }}
							</td>
							<td v-else>-</td>
						</tr>
						<tr>
							<td>Average</td>
							<td v-if="treemapStore.collectionData[0].average_one_hour">
								{{ treemapStore.collectionData[0].average_one_hour.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].average_twelve_hours">
								{{ treemapStore.collectionData[0].average_twelve_hours.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].average_one_day">
								{{ treemapStore.collectionData[0].average_one_day.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
							<td v-if="treemapStore.collectionData[0].seven_days">
								{{ treemapStore.collectionData[0].average_seven_days.toFixed(2) }}
								<i class="eth"></i>
							</td>
							<td v-else>-</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-else class="no_collection">
			<div>
				<h1>Collection not found.</h1>
				<a href="/"> Back to home </a>
			</div>
		</div>
	</div>
	<div v-else id="list_loading" class="list_loading">Loading...</div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useTreemapStore } from "@/stores/treemap";
import { useRouter } from "vue-router";
const router = useRouter();

const treemapStore = useTreemapStore();

onMounted(() => {
	treemapStore.getData().then((data) => {
		document.title = treemapStore.collectionData[0].name + " NFT Collection - NFT360";
		var desc =
			"Discover stats of the popular NFT collection " +
			treemapStore.collectionData[0].name +
			" on NFT360. NFT360 provides you with a fancy heatmap of the 100 best-selling NFT collections of the moment.";
		document.querySelector('meta[name="description"]').setAttribute("content", desc);
	});
});

function address() {
	var copyText = document.getElementById("address");
	var buttonAddress = document.getElementById("buttonAddress");
	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices
	navigator.clipboard.writeText(copyText.value);

	buttonAddress.innerText = "Copied !";
	setTimeout(() => {
		buttonAddress.innerText = "Copy";
	}, 3000);
}
</script>

<style lang="scss" scoped>
.collection {
	width: 100%;
	min-height: 100%;
	padding-top: 90px;
	padding-bottom: 100px;
	background: #fafafa;
	.wrapper_collection {
		width: 95%;
		max-width: 1280px;
		margin: 0 auto;
		.banner {
			width: 100%;
			height: 200px;
			background-size: cover;
			overflow: hidden;
			border: 1px solid #000;
			box-sizing: border-box;
			box-shadow: 4px 4px 0px -1px #000000;
		}
		.infos_wrapper {
			overflow: hidden;
			padding: 50px 30px;
			border: 1px solid #000;
			margin-top: 20px;
			background: #fff;
			box-shadow: 4px 4px 0px -1px #000000;
			.head {
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				.title {
					font-weight: 700;
					padding-bottom: 10px;
				}
				a {
					border: 1px solid #000;
					color: #000;
					box-sizing: border-box;
					display: inline-block;
					text-decoration: none;
					border-radius: 3px;
					padding: 10px 20px;
					margin-left: 10px;
					font-size: 0.8em;
				}
			}
			.infos {
				border-top: 1px solid #000;
				border-bottom: 1px solid #000;
				padding: 10px 0;
				span {
					padding-right: 30px;
				}
			}
			.description {
				font-size: 1em;
				line-height: 1.2em;
				padding: 30px 0;
			}
			.stats {
				display: flex;
				justify-content: flex-start;
				gap: 40px;
				padding-bottom: 30px;
				.stat {
					display: flex;
					flex-direction: column;
					.stat_nb {
						font-weight: 700;
						font-size: 1.5em;
					}
					.stat_desc {
						color: grey;
						text-transform: lowercase;
					}
				}
			}
			.gallery {
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 30px;
				.gallery_item {
					display: flex;
					flex-direction: column;
					width: 18%;
					border-radius: 0px;
					overflow: hidden;
					border: 1px solid #000;
					box-shadow: 4px 4px 0px -1px #000000;
				}
			}
			.address {
				padding-bottom: 30px;
				label {
					font-weight: 700;
					padding-bottom: 5px;
					display: block;
				}
				input,
				button {
					padding: 10px;
					width: auto;
					background: none;
					border: 1px solid #000;
				}
				button {
					margin-left: 5px;
					border-radius: 3px;
					cursor: pointer;
				}
			}
		}
	}
}

.description h2,
.collection h3 {
	font-weight: 700;
	font-size: 1.2em;
	padding-bottom: 10px;
}

.collection table {
	width: 100%;
	border: 1px solid #000;
	box-shadow: 4px 4px 0px -1px #000000;
	td,
	tr,
	th {
		border: 1px solid #000;
		text-align: left;
		padding: 1vw;
	}
	th,
	tr td:first-of-type {
		background: #fff;
		color: #000;
		font-weight: 700;
	}
}

.no_collection {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000;
	text-align: center;
	height: 100vh;
	inset: 0;
	background: #fafafa;
	h1 {
		width: 100%;
		font-weight: 900;
		margin-bottom: 5vh;
	}

	a {
		background: #fff;
		border: 1px solid #000;
		color: #000;
		box-sizing: border-box;
		border-radius: 3px;
		padding: 10px 20px;
		transition: all 0.3s ease-in-out;
		display: inline-block;
		line-height: normal;
		text-decoration: none;
	}
}

i.eth {
	display: inline-block;
	background: url("/src/assets/img/eth_black.svg") no-repeat;
	width: 12px;
	height: 12px;
}

@media (min-aspect-ratio: 16 / 9) {
	.title,
	.no_collection h1 {
		font-size: 3vw;
	}

	.no_collection a {
		font-size: 1vw;
	}

	.collection table td,
	.collection table tr,
	.collection table th {
		font-size: 1vw;
	}
}

@media (max-aspect-ratio: 16 / 9) {
	.title,
	.no_collection h1 {
		font-size: 6vh;
	}

	.no_collection a {
		font-size: 3vh;
	}

	.collection table td,
	.collection table tr,
	.collection table th {
		font-size: 1em;
	}
}

@media (max-width: 768px) {
	.gallery_item {
		width: 48%;
		margin-bottom: 20px;
	}
}
</style>
