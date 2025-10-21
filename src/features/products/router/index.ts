import type { RouteRecordRaw } from "vue-router";
import Products from "../pages/Products.vue";
import AddProductForm from "../pages/AddProductForm.vue";
import DetailsProduct from "../pages/DetailsProduct.vue";

export const productsRoutes: RouteRecordRaw[] = [
    {
        path: "/products/list",
        component: Products,
        name: "Products",
    },
    {
        path: "/products/add",
        component: AddProductForm,
        name: "Adicionar Produto",
    },
    {
        path: "/products/details/:id",
        component: DetailsProduct,
        name: "Detalhes do Produto",
    }
];