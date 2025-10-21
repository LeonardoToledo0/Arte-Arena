
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: Cookies.get("token") || null,
        user: Cookies.get("user") || null,
    }),

    actions: {
        setAuthData(token: string, user: string) {
            this.token = token;
            this.user = user;


            Cookies.set("token", token, { expires: 7 });
            Cookies.set("user", user, { expires: 7 });
        },

        logout() {
            this.token = null;
            this.user = null;
            Cookies.remove("token");
            Cookies.remove("user");
        },
    },
});
