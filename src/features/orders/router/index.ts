import type { RouteRecordRaw } from "vue-router";
import DetailsOrder from "../pages/DetailsOrder.vue";
import RecentOrders from "../pages/RecentOrders.vue";

export const ordersRoutes: RouteRecordRaw[] = [
    {
        path: "/orders",
        component: RecentOrders,
        name: "Orders",
    },
    {
        path: "/orders/details/:id",
        component: DetailsOrder,
        name: "Recent Orders",
    }
];