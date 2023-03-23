<template>
	<div class="app">
		<Header />
		<div class="content">
			<section class="wrapper">
				<div class="container">
					<router-view />
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import Header from "@/components/Layout/Header.vue";
</script>

<style scoped>
.container {
	width: 100%;
	max-width: 100%;
}
</style>
