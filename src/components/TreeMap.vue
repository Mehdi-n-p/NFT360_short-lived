<template>
	<transition name="fade">
		<div v-if="!treemapStore.loading" id="main" @wheel="wheel">
			<div
				v-if="treemapStore.squarifyData.length > 0"
				id="treemap"
				@mousedown="mousedown"
				@mousemove="mousemove"
			>
				<div
					v-for="item in treemapStore.squarifyData"
					:key="item.data.name"
					class="square"
					:class="{ square_default: item.data['img' + treemapStore.imgNum] === null }"
					:style="`width: ${item.width}px;
                    height: ${item.height}px;
                    top: ${item.y}px;
                    left: ${item.x}px;
                    background-image: url('${item.data['img' + treemapStore.imgNum]}');
                    font-size: ${item.width / 11}px;`"
				>
					<div class="mask" />
					<a
						href="#"
						@click.prevent
						@mousedown="linkMousedown"
						@mouseup="linkMouseup($event, item.data.slug)"
						draggable="false"
					>
						<div class="infos">
							{{ item.data.name }}
							<div
								:style="`font-size: ${item.width / 15}px;line-height: ${
									item.width / 12
								}px;padding-top: ${item.width / 13}px;`"
							>
								<span
									v-if="item.data['volume_' + treemapStore.timeInterval] !== null"
								>
									Volume :
									{{
										item.data["volume_" + treemapStore.timeInterval].toFixed(2)
									}}
									<i
										class="eth"
										:style="`width: ${item.width / 21}px; height: ${
											item.width / 21
										}px;`"
									></i>
								</span>
								<span
									v-if="
										item.data['total_sales_' + treemapStore.timeInterval] !==
										null
									"
								>
									Sales :
									{{ item.data["total_sales_" + treemapStore.timeInterval] }}
								</span>
								<span
									v-if="
										item.data['floor_price_' + treemapStore.timeInterval] !==
										null
									"
								>
									Floor :
									{{ item.data["floor_price_" + treemapStore.timeInterval] }}
									<i
										class="eth"
										:style="`width: ${item.width / 21}px; height: ${
											item.width / 21
										}px;`"
									></i>
								</span>
								<span
									v-if="
										item.data[
											'floor_price_change_' + treemapStore.timeInterval
										] !== null
									"
								>
									Variation {{ treemapStore.timeText }} :
									<span
										:style="
											item.data[
												'floor_price_change_' + treemapStore.timeInterval
											] >= 0
												? 'color: #00f807'
												: 'color: #ff4848'
										"
									>
										<span
											v-if="
												item.data[
													'floor_price_change_' +
														treemapStore.timeInterval
												] > 0
											"
											>+</span
										>{{
											item.data[
												"floor_price_change_" + treemapStore.timeInterval
											].toFixed(0)
										}}%
									</span>
								</span>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div v-else class="loading" style="margin-top: -35px">No data</div>
		</div>
		<div v-else class="loading">Loading...</div>
	</transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTreemapStore } from "@/stores/treemap";
import { useRouter } from "vue-router";
const router = useRouter();

const treemapStore = useTreemapStore();
const previousX = ref(0);
const previousY = ref(0);
const scale = ref(1);
const factor = 0.1;
const max_scale = 30;

onMounted(() => {
	resize();

	window.addEventListener(
		"resize",
		function () {
			resize();
		},
		true
	);
});

const resize = () => {
	if (document.querySelector("#main")) {
		treemapStore.width = document.querySelector("#main").offsetWidth;
		treemapStore.height = document.querySelector("#main").offsetHeight;
	}
};

const mousedown = (event) => {
	previousX.value = event.pageX;
	previousY.value = event.pageY;
};

const mousemove = (event) => {
	const divMain = document.querySelector("#main");

	// only do this when the primary mouse button is pressed (event.buttons = 1)
	if (event.buttons) {
		let dragX = 0;
		let dragY = 0;
		// skip the drag when the x position was not changed
		if (event.pageX - previousX.value !== 0) {
			dragX = previousX.value - event.pageX;
			previousX.value = event.pageX;
		}
		// skip the drag when the y position was not changed
		if (event.pageY - previousY.value !== 0) {
			dragY = previousY.value - event.pageY;
			previousY.value = event.pageY;
		}
		// scrollBy x and y
		if (dragX !== 0 || dragY !== 0) {
			divMain.scrollBy(dragX, dragY);
		}
	}
};

const wheel = (e) => {
	const divMain = document.querySelector("#main");
	const divTreemap = document.querySelector("#treemap");

	e.preventDefault();
	let delta = e.delta || e.wheelDelta;
	if (delta === undefined) {
		//we are on firefox
		delta = e.originalEvent.detail;
	}
	delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency
	const offset = { x: divMain.scrollLeft, y: divMain.scrollTop };
	const image_loc = {
		x: e.pageX + offset.x,
		y: e.pageY + offset.y,
	};

	const zoom_point = { x: image_loc.x / scale.value, y: image_loc.y / scale.value };

	// apply zoom
	scale.value += delta * factor * scale.value;
	scale.value = Math.max(1, Math.min(max_scale, scale.value));

	const zoom_point_new = { x: zoom_point.x * scale.value, y: zoom_point.y * scale.value };

	const newScroll = {
		x: zoom_point_new.x - e.pageX,
		y: zoom_point_new.y - e.pageY,
	};

	divTreemap.style.transform = `scale(${scale.value}, ${scale.value})`;
	divMain.scrollTop = newScroll.y;
	divMain.scrollLeft = newScroll.x;
};

var downX, downY, upX, upY;

const linkMousedown = (event) => {
	downX = event.clientX;
	downY = event.clientY;
};

const linkMouseup = (event, slug) => {
	upX = event.clientX;
	upY = event.clientY;

	if (downX === upX && downY === upY) {
		router.push({ path: "/collection/" + slug, meta: { title: slug } });
	}
};
</script>

<style lang="scss" scoped>
#main {
	position: absolute;
	top: 70px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
}

#treemap {
	width: 100%;
	height: 100%;
	transform-origin: 0 0;
	opacity: 1; /*0 originally*/
	transition: opacity 1s ease-out;
	.infos {
		position: absolute;
		padding: 0 15%;
		opacity: 0;
		transition: opacity 0.4s ease-in-out;
		text-align: left;
		font-weight: 600;
		& > div > span {
			display: inline-block;
			width: 100%;
			font-weight: normal;
		}
	}
	.square a {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #fff;
		pointer-events: all;
	}
	& > div {
		position: absolute;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #fff;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		overflow: hidden;
		background-size: cover;
		background-position: center center;
		z-index: 2;
		&:hover .mask {
			opacity: 0.75;
		}
		&:hover .infos {
			opacity: 1;
		}
		& > a > div > span {
			width: 100%;
			display: inline-block;
			font-weight: 300;
		}
	}
}

i.eth {
	display: inline-block;
	background: url("/src/assets/img/eth.svg") no-repeat;
}

.square_default {
	background-image: url("/src/assets/img/nft_default.png") !important;
}

.mask {
	position: absolute;
	inset: 0;
	background: #000;
	transition: opacity 0.7s ease-in-out;
	padding: 3px;
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

.loading {
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
