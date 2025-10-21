import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { authGuard } from "../shared/middleware/auth";

// Importando layout
import Layout from "../layouts/Layout.vue";
import LandingPage from "../features/Home/pages/LandingPage.vue";
import Login from "../features/auth/pages/Login.vue";
import Register from "../features/auth/pages/Register.vue";

// Importando rotas de módulos

import { dashboardRoutes } from "../features/dashboard/router";
import { productsRoutes } from "../features/products/router";
import { ordersRoutes } from "../features/orders/router";
import { usersRoutes } from "../features/users/router";



// Rotas principais
const routes: RouteRecordRaw[] = [
    { path: "/", component: LandingPage, name: "Home" },
    { path: "/auth/login", component: Login, name: "Login" },
    { path: "/auth/register", component: Register, name: "Register" },
    {
        path: "/",
        component: Layout,
        beforeEnter: authGuard,
        children: [
            ...dashboardRoutes,
            ...productsRoutes,
            ...ordersRoutes,
            ...usersRoutes,
        ],
    },
];

// Criando router
export const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
