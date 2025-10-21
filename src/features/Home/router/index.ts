import type { RouteRecordRaw } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";

export const homeRoutes: RouteRecordRaw[] = [
    {
        path: "",
        component: LandingPage,
        name: "Home",
    },
];