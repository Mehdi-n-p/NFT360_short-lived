<template>
	<div class="screen_lightbox">
		<div class="screen_lightbox_in">
			<div id="close" class="close">&times;</div>
			<h2>Download screenshot</h2>
			<div id="canvas_container" class="canvas_container" />
			<a id="download" href="#">Download</a>
			<h2>Embed into website</h2>
			<textarea id="iframe_url" />
			<!-- <iframe src="https://coin360.com/widget/map.html?utm_source=embed_map" frameborder="0" title="Coin360.com: Cryptocurrency Market State" width="400" height="300"></iframe> -->
		</div>
	</div>
</template>

<script setup>
import { useTreemapStore } from "@/stores/treemap";

const treemapStore = useTreemapStore();
</script>

<style lang="scss" scoped>
.screen_lightbox {
	background-color: rgba(50, 50, 50, 0.7);
	inset: 0;
	visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 2;
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
		h2 {
			font-size: 20px;
			text-align: center;
			padding-bottom: 10px;
		}
	}
	canvas {
		width: 100% !important;
		height: auto !important;
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

#iframe_url {
	width: 100%;
	height: 100px;
	resize: none;
	background: #f6f6f6;
}

#download {
	background: #0045ff url("src/assets/img/download.png");
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
</style>
