import { getProducts, getUsers, getCarts } from "./fakestore";

export const getAll = async () => {
    try {
        const [productsRes, usersRes, cartsRes] = await Promise.all([
            getProducts(),
            getUsers(),
            getCarts()
        ]);

        return {
            products: productsRes.data,
            users: usersRes.data,
            carts: cartsRes.data
        };
    } catch (err) {
        console.error("Erro ao buscar todos os dados da API:", err);
        return {
            products: [],
            users: [],
            carts: []
        };
    }
};
