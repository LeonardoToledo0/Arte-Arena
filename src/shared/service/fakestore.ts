import { api } from "./interceptor";
import type { Product } from "../types/product.interface";
import type { User } from "../types/user.interface";
import type { Cart } from "../types/cart.interface";
import type { ProductInput } from "../types/productInput.interface";
import type { UserInput } from "../types/userInput.interface"



// api get
export const getProducts = () => api.get("/products");
export const getUsers = () => api.get("/users");
export const getCarts = () => api.get("/carts");
export const getSingleProduct = (id: number) => api.get(`/products/${id}`);
export const getSingleUser = (id: number) => api.get(`/users/${id}`);
export const getSingleCart = (id: number) => api.get(`/carts/${id}`);

// api post

export const userLogin = (credentials: { username: string; password: string }) => api.post("/auth/login", {
    ...credentials
});
export const createProduct = (product: ProductInput) => api.post("/products", product);
export const createUser = (user: UserInput) => api.post("/users", user);
export const createCart = (cart: Cart) => api.post("/carts", cart);

// api put
export const updateProduct = (id: number, product: Partial<Product>) =>
    api.put(`/products/${id}`, product);

export const updateUser = (id: number, user: Partial<User>) =>
    api.put(`/users/${id}`, user);

export const updateCart = (id: number, cart: Partial<Cart>) =>
    api.put(`/carts/${id}`, cart);

// api delete
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);
export const deleteCart = (id: number) => api.delete(`/carts/${id}`);