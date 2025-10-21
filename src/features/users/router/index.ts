import type { RouteRecordRaw } from "vue-router";
import Users from "../pages/Users.vue";
import AddUserForm from "../pages/AddUserForm.vue";
import DetailsUser from "../pages/DetailsUser.vue";


export const usersRoutes: RouteRecordRaw[] = [
    {
        path: "/users/list",
        component: Users,
        name: "Users",
    },
    {
        path: "/users/add",
        component: AddUserForm,
        name: "Adicionar Usuário",
    },
    {
        path: "/users/details/:id",
        component: DetailsUser,
        name: "Detalhes do Usuário",
    }
];