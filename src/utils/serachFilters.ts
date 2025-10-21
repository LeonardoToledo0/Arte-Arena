import { computed, ref } from "vue";
import type { Cart } from "../shared/types/cart.interface";
import type { Product } from "../shared/types/product.interface";
import type { User } from "../shared/types/user.interface";
import type { CartProduct } from "../shared/types/cartProduct.interface";

type SearchType = "users" | "products" | "carts" | "cartProducts";

export const searchValue = ref("");
export const searchType = ref<SearchType>("users");
export const rows = ref<(User | Product | Cart | CartProduct)[]>([]);

// Arrays globais para acessar dentro do filtro
export const users = ref<User[]>([]);
export const products = ref<Product[]>([]);

// Função utilitária para transformar objeto em string
function objectToString(obj: Record<string, any>): string {
    return Object.values(obj)
        .map((val) => {
            if (val === null || val === undefined) return "";
            if (typeof val === "object") return objectToString(val);
            return String(val).toLowerCase();
        })
        .join(" ");
}

// Computed filtrado
export const filteredRows = computed(() => {
    const value = searchValue.value.trim().toLowerCase();
    if (!value) return rows.value;

    switch (searchType.value) {
        case "users":
            return rows.value.filter(
                (row): row is User =>
                    "username" in row &&
                    objectToString(row).includes(value)
            );

        case "products":
            return rows.value.filter(
                (row): row is Product =>
                    "title" in row &&
                    objectToString(row).includes(value)
            );

        case "carts":
        case "cartProducts":
            return rows.value
                .filter((row): row is Cart => "products" in row && Array.isArray(row.products))
                .map((row) => {
                    // Dados do usuário
                    const user = users.value.find((u) => u.id === row.userId);
                    const userString = user
                        ? [user.username, user.email, user.phone].map((v) => (v ?? "").toLowerCase()).join(" ")
                        : "";

                    // Dados dos produtos do carrinho
                    const productsString = row.products
                        .map((item) => {
                            const product = products.value.find((p) => p.id === item.productId);
                            return product ? objectToString(product) : "";
                        })
                        .join(" ");

                    // Dados do próprio carrinho
                    const cartString = objectToString(row);

                    // Verifica se bate no filtro
                    if (cartString.includes(value) || userString.includes(value) || productsString.includes(value)) {
                        // Retorna o objeto completo, preenchendo valores default para evitar erros
                        return {
                            ...row,
                            products: row.products.map((p) => ({
                                ...p,
                                rate: (p as any)?.rate ?? 0, // garante que rate exista
                            })),
                        };
                    }

                    return null;
                })
                .filter((row): row is Cart => row !== null);

        default:
            return rows.value;
    }
});
