<template>
	<div class="ho_no_404">
		<div>
			<h1>NFT<span>360</span><span>404</span></h1>
			<a href="/">BACK TO HOME</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.ho_no_404 {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000;
	text-align: center;
	height: 100vh;
	h1 {
		width: 100%;
		font-weight: 900;
		margin-bottom: 5vh;
		span:nth-child(1) {
			text-decoration: line-through;
		}
		span:nth-child(2) {
			color: #0045ff;
		}
	}
	a {
		background: #fff;
		border: 1px solid #000;
		color: #000;
		box-sizing: border-box;
		border-radius: 8px;
		padding: 10px 20px;
		transition: all 0.3s ease-in-out;
		display: inline-block;
		line-height: normal;
		text-decoration: none;
	}
}

@media (min-aspect-ratio: 16 / 9) {
	.ho_no_404 {
		h1 {
			font-size: 5vw;
		}
		a {
			font-size: 1vw;
		}
	}
}

@media (max-aspect-ratio: 16 / 9) {
	.ho_no_404 {
		.h1 {
			font-size: 8vh;
		}

		a {
			font-size: 3vh;
		}
	}
}
</style>
