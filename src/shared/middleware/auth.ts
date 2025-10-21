import type { NavigationGuardNext } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from "../../features/auth/store/useAuthStore";
import Cookies from "js-cookie";

export const authGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();

    // Pega token e usuário da store ou dos cookies
    const token = authStore.token || Cookies.get("token");
    const user = authStore.user || Cookies.get("user");

    if (token && user) {
        // Usuário logado → permite acessar
        next();
    } else {
        // Usuário não logado → redireciona para home/login
        next({ path: "/", query: { redirect: to.fullPath } });
    }
};
