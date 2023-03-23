<template>
	<TreeMap v-if="treemapStore.view === 'treemap'" />
	<List v-else-if="treemapStore.view === 'list'" />
</template>

<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useTreemapStore } from "@/stores/treemap";

import TreeMap from "@/components/TreeMap.vue";
import List from "@/components/List.vue";
const treemapStore = useTreemapStore();

onMounted(() => {
	treemapStore.getData();
});

const { timeInterval } = storeToRefs(treemapStore);

watch(timeInterval, () => {
	treemapStore.getData();
});
</script>
