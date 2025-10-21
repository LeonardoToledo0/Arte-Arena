import type { RouteRecordRaw } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: "/auth/login",
        component: Login,
        name: "Login",
    },
    {
        path: "/auth/register",
        component: Register,
        name: "Register",
    }
];