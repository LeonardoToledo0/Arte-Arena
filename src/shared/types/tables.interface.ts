export interface Table {
    type: "products" | "users" | "carts";
    id: number;
    title?: string;
    category?: string;
    price?: number;
    rating?: number;
    email?: string;
    phone?: string;
    username?: string;
    address?: string;
    city?: string;
    zipcode?: string;
    number?: string;
    street?: string;
    imageUrl?: string;
}