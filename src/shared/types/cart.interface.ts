import type { CartProduct } from "./cartProduct.interface";

export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
}