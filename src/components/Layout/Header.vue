<template>
	<header>
		<div class="menu_responsive">
			<a href="#" @click="menu()">
				<img src="/src/assets/img/menu_responsive.svg" />
			</a>
		</div>

		<div class="logo">
			<a href="/"> NFT360</a>
		</div>

		<div class="mask_responsive" @click="menu()" />

		<a v-if="$route.name === 'Collection'" href="/"> BACK TO HOME </a>

		<div
			v-if="$route.name !== 'Collection'"
			class="header_container"
			data-html2canvas-ignore="true"
		>
			<div class="close_responsive_menu">
				<div @click="menu()">&#10006;</div>
			</div>

			<ul id="menu_pages">
				<li><a href="#">WALL OF FAME</a></li>
				<li><a href="#">UPCOMING PROJECTS</a></li>
			</ul>

			<div id="tabs" data-html2canvas-ignore="true">
				<div class="select_wrapper" title="Blockchain">
					<select
						id="blockchain"
						name="blockchain"
						@change="(event) => (treemapStore.blockchainType = event.target.value)"
					>
						<!-- <option
							:selected="treemapStore.blockchainType === 'All'"
							value="All">
							All
						</option> -->
						<option
							:selected="treemapStore.blockchainType === 'Ethereum'"
							value="Ethereum"
						>
							Ethereum
						</option>
						<option disabled="disabled" value="Solana">Solana [Soon]</option>
						<option disabled="disabled" value="Polygon">Polygon [Soon]</option>
					</select>
				</div>

				<div class="select_wrapper" title="Last">
					<select
						id="duration"
						name="duration"
						value="one_day"
						@change="
							(event) => {
								treemapStore.timeInterval = event.target.value;
								treemapStore.sortKey = 'volume_' + event.target.value;
								treemapStore.timeText =
									event.target[event.target.selectedIndex].innerText;
							}
						"
					>
						<option
							:selected="treemapStore.timeInterval === 'one_hour'"
							value="one_hour"
						>
							1h
						</option>
						<option
							:selected="treemapStore.timeInterval === 'twelve_hours'"
							value="twelve_hours"
						>
							12h
						</option>
						<option :selected="treemapStore.timeInterval === 'one_day'" value="one_day">
							1 day
						</option>
						<option
							:selected="treemapStore.timeInterval === 'seven_days'"
							value="seven_days"
						>
							7 days
						</option>
					</select>
				</div>

				<ul id="menu_show" title="Show">
					<li
						@click="treemapStore.show = 'up'"
						:class="{ active_tab: treemapStore.show === 'up' }"
					>
						<a href="#">
							<img src="/src/assets/img/up.svg" />
						</a>
					</li>
					<li
						@click="treemapStore.show = 'down'"
						:class="{ active_tab: treemapStore.show === 'down' }"
					>
						<a href="#">
							<img src="/src/assets/img/down.svg" />
						</a>
					</li>
					<li
						:class="{ active_tab: treemapStore.show === 'all' }"
						@click="treemapStore.show = 'all'"
					>
						<a href="#"> All </a>
					</li>
				</ul>

				<ul id="menu_view" title="View">
					<li
						:class="{ active_tab: treemapStore.view === 'treemap' }"
						@click="treemapStore.view = 'treemap'"
					>
						<a href="#"><img src="/src/assets/img/view_blocks.svg" /></a>
					</li>
					<li
						:class="{ active_tab: treemapStore.view === 'list' }"
						@click="treemapStore.view = 'list'"
					>
						<a href="#"><img src="/src/assets/img/view_list.svg" /></a>
					</li>
				</ul>
			</div>

			<div class="inputs" data-html2canvas-ignore="true">
				<input
					id="shuffle"
					type="button"
					value="Shuffle"
					@click="
						treemapStore.imgNum < 4 ? treemapStore.imgNum++ : (treemapStore.imgNum = 1)
					"
				/>
				<input id="screen_launcher" type="button" value="Share" @click="screenshot()" />
			</div>
		</div>
	</header>

	<div class="screen_lightbox">
		<div class="screen_lightbox_in">
			<div id="close" class="close" @click="close()">&times;</div>
			<div class="title_lightbox">Download screenshot</div>
			<div id="canvas_container" class="canvas_container" />
			<a id="download" href="#">Download</a>
			<div class="title_lightbox">Embed into website</div>
			<textarea id="iframe_url" />
			<!-- <iframe src="https://coin360.com/widget/map.html?utm_source=embed_map" frameborder="0" title="Coin360.com: Cryptocurrency Market State" width="400" height="300"></iframe> -->
		</div>
	</div>
</template>

<script setup>
import { useTreemapStore } from "@/stores/treemap";
// import { useRoute, useRouter } from 'vue-router';

// const router = useRouter();

const treemapStore = useTreemapStore();

function screenshot() {
	document.getElementById("canvas_container").innerHTML = "";
	document.getElementById("download").setAttribute("href", "");

	let blockchain_select = document.getElementById("blockchain");
	let duration_select = document.getElementById("duration");

	// eslint-disable-next-line no-undef
	html2canvas(document.querySelector("body"), { allowTaint: true, useCORS: true }).then(
		(canvas) => {
			var today = new Date();
			var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
			var time = today.getHours() + ":" + today.getMinutes(); //+ ":" + today.getSeconds();
			var dateTime = date + " " + time;

			var w_window = window.innerWidth - 70;

			document.querySelector(".screen_lightbox").style.visibility = "visible";
			document.querySelector(".screen_lightbox").style.opacity = 1;
			var ctx = canvas.getContext("2d");
			ctx.font = "20px Arial";
			ctx.textAlign = "right";

			ctx.fillText(
				"Blockchain : " +
					blockchain_select.options[blockchain_select.selectedIndex].text +
					" — Time interval : " +
					duration_select.options[duration_select.selectedIndex].text +
					" — " +
					dateTime,
				w_window,
				40
			);

			document.getElementById("iframe_url").value =
				'<iframe src="/iframe?blockchain=' +
				blockchain_select.value +
				"&duration=" +
				duration_select.value +
				'" frameborder="0" title="NFT360" width="400" height="300"></iframe>';

			canvas.style.width = "100%";
			canvas.style.height = "auto";
			document.querySelector(".canvas_container").prepend(canvas);
			download(canvas, "Screen_NFT360");
		}
	);
}

function download(canvas, filename) {
	const data = canvas.toDataURL("image/png;base64");
	const downloadLink = document.querySelector("#download");
	downloadLink.download = filename;
	downloadLink.href = data;
}

function close() {
	document.querySelector(".screen_lightbox").style.visibility = "hidden";
	document.querySelector(".screen_lightbox").style.opacity = 0;
}

function menu() {
	document.querySelector("header").classList.toggle("active_responsive");
}
</script>

<style lang="scss" scoped>
header {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 70px;
	color: #3b3d37;
	background: #fff;
	box-sizing: border-box;
	line-height: 70px;
	padding: 0 50px;
	font-weight: 500;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 2;
	border-bottom: 1px solid #000;
	.logo {
		font-weight: 900;
		font-size: 3em;
		color: #000;
		vertical-align: middle;
		font-family: "Montserrat", sans-serif;
	}
	a {
		text-decoration: none;
		color: #000;
	}
	select {
		border-radius: 3px;
		padding: 0px 10px;
		border: 1px solid #dbdee7;
		z-index: 1;
		font-family: "Roboto", sans-serif;
	}
	.header_container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
	}
}

.close_responsive_menu {
	display: none;
	text-align: left;
	padding-right: 0px;
	div {
		display: inline-block;
		padding: 0 20px;
		font-weight: 900;
		font-size: 1.5em;
		cursor: pointer;
	}
}

ul#menu_pages {
	display: none;
	justify-content: space-evenly;
	box-sizing: border-box;
	& > li {
		padding: 0 10px;
		position: relative;
		transition: all 0.3s ease-in;
		&::before {
			content: "Soon !";
			position: absolute;
			height: 10px;
			padding: 3px 5px;
			color: #fff;
			border-radius: 3px;
			right: -5px;
			top: 12px;
			background: #f6a31d;
			line-height: 010px;
		}
	}
}

#tabs {
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	& > select:first-of-type {
		margin-left: 0px;
	}
	option:disabled {
		color: #aaa;
	}
	& ul[title]::before,
	& .select_wrapper[title]::before {
		content: attr(title);
		position: absolute;
		top: -42px;
		left: 0;
		font-size: 10px;
		z-index: 0;
	}
	& > ul > li {
		width: 24px;
		height: 24px;
		border: 1px solid #dbdee7;
		border-right: none;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		&:first-of-type {
			border-radius: 4px 0 0 4px;
		}
		&:last-of-type {
			border-right: 1px solid #dbdee7;
			border-radius: 0 4px 4px 0;
		}
		&.active_tab {
			background: #000;
			& > a > img {
				filter: invert(100%);
			}
			& > a {
				color: #fff;
			}
		}
		&:not(.active_tab):hover {
			background: #ddd;
			transition: all 0.3s ease-in;
		}
		& > a > img {
			position: absolute;
			width: 24px;
			height: 24px;
			left: 0;
			top: 0;
		}
	}
}

#tabs > ul,
.select_wrapper {
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	position: relative;
	margin-top: 10px;
	margin-left: 20px;
}

.inputs input,
#download {
	border: none;
	color: #fff;
	border-radius: 8px;
	padding: 10px 20px 10px 40px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	display: inline-block;
	font-size: 15px;
	line-height: normal;
	font-family: "Roboto", sans-serif;
}

.inputs input:hover,
#download:hover,
.menu_responsive:hover,
.close_responsive_menu:hover,
#menu_pages > li:hover {
	opacity: 0.7;
	cursor: pointer;
}

#shuffle {
	background: #fff url("/src/assets/img/shuffle.svg");
	background-size: 20px 20px;
	background-repeat: no-repeat;
	background-position: 15% center;
	border: 1px solid #000;
	color: #000;
	box-sizing: border-box;
}

#screen_launcher {
	background: #0045ff url("/src/assets/img/share.svg");
	background-size: 20px 20px;
	background-repeat: no-repeat;
	background-position: 15% center;
	border: 1px solid #0045ff;
	margin-left: 20px;
}

.menu_responsive {
	display: none;
	margin-right: 30px;
	img {
		display: block;
	}
}

/*Lightbox*/
.screen_lightbox {
	background-color: rgba(50, 50, 50, 0.7);
	inset: 0;
	visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 3;
	transition: all 0.5s ease-in-out;
	opacity: 0;
	.screen_lightbox_in {
		width: 25%;
		padding: 5%;
		background-color: #fff;
		text-align: center;
		position: relative;
		border-radius: 10px;
		box-shadow: 0 8px 32px 0 rgb(24 24 24 / 16%);
	}
}

.close {
	font-size: 40px;
	font-weight: bold;
	color: #000;
	position: absolute;
	top: 20px;
	right: 30px;
	&:hover {
		cursor: pointer;
	}
}

.title_lightbox {
	font-size: 20px;
	text-align: center;
	padding-bottom: 10px;
	font-weight: 700;
}

#iframe_url {
	width: 100%;
	height: 100px;
	resize: none;
	background: #f6f6f6;
}

#download {
	background: #0045ff url("/src/assets/img/download.png");
	background-size: 20px 20px;
	background-repeat: no-repeat;
	background-position: 10% center;
	margin: 10px 0 40px 0;
	border: none;
	color: #fff;
	border-radius: 8px;
	padding: 10px 20px 10px 40px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	display: inline-block;
	font-size: 15px;
}

@media (max-width: 1250px) {
	header {
		justify-content: unset;
		padding-left: 20px;
		&.active_responsive .header_container {
			transform: translateX(250px);
		}
		&.active_responsive .mask_responsive {
			opacity: 0.7;
			transition: opacity 0.5s ease-out;
			left: 0;
		}
		.header_container {
			position: fixed;
			z-index: 2;
			top: 0;
			left: -250px;
			bottom: 0;
			max-width: 250px;
			background: white;
			display: block;
			align-items: unset;
			justify-content: unset;
			overflow-y: auto;
			overflow-x: hidden;
			transition: all 0.5s ease-out;
		}
	}

	.menu_responsive {
		display: block;
	}

	.mask_responsive {
		position: fixed;
		display: block;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 100%;
		right: 0;
		background: #000;
		opacity: 0;
	}

	.close_responsive_menu {
		display: block;
	}

	ul#menu_pages,
	#tabs,
	.inputs {
		display: block;
		align-items: unset;
		justify-content: unset;
	}

	ul#menu_pages > li {
		padding: 0 30px;
		border-bottom: 1px solid #ccc;

		&:first-of-type {
			border-top: 1px solid #ccc;
		}

		&::before {
			right: 40px;
		}
	}

	.select_wrapper,
	#tabs > ul {
		display: flex;
		justify-content: left;
		box-sizing: border-box;
		position: relative;
		margin-top: 30px;
		margin-left: unset;
		padding: 0 30px;
	}

	#tabs {
		padding-bottom: 20px;
		.select_wrapper[title]::before,
		ul[title]::before {
			top: -42px;
			left: 30px;
		}
	}

	.inputs {
		border-top: 1px solid #ccc;
		padding-bottom: 20px;

		input {
			display: block;
		}
	}

	#shuffle,
	#screen_launcher {
		margin-left: 30px;
		margin-top: 20px;
	}
}
</style>
