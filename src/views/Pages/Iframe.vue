<template>
	<HeaderIframe />
	<TreeMap />
</template>

<script setup>
import TreeMap from "@/components/TreeMap.vue";
import HeaderIframe from "@/components/Layout/HeaderIframe.vue";
import { onMounted } from "vue";
import { useTreemapStore } from "@/stores/treemap";

const treemapStore = useTreemapStore();

onMounted(() => {
	treemapStore.blockchainType = blockchain_select;
	treemapStore.timeInterval = duration_select;
	treemapStore.getData();
});

let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has("blockchain")) {
	// var blockchain_select = capitalizeFirstLetter(searchParams.get('blockchain'))
	var blockchain_select = searchParams.get("blockchain");
} else {
	blockchain_select = "All";
}

if (searchParams.has("duration")) {
	var duration_select = searchParams.get("duration");
} else {
	duration_select = "alltime";
}
</script>
