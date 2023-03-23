import { createRouter, createWebHistory } from "vue-router";

// Layouts
import AppLayout from "../views/Layouts/AppLayout.vue";

// Pages
import Home from "../views/Pages/Home.vue";
import Iframe from "../views/Pages/Iframe.vue";
import Error404 from "../views/Pages/Errors/Error404.vue";
import Collection from "../views/Pages/Collection.vue";

// Router
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			layout: AppLayout,
		},
	},
	{
		path: "/collection/:slug",
		name: "Collection",
		component: Collection,
		meta: {
			layout: AppLayout,
		},
	},
	{
		path: "/iframe",
		name: "Iframe",
		component: Iframe,
		meta: {
			layout: AppLayout,
		},
	},
	{
		path: "/:catchAll(.*)",
		name: "Error404",
		component: Error404,
		meta: {
			layout: Error404,
		},
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
