export interface InitialForm {
    type: "product" | "user";
    id?: number;
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    image?: string;
    icon?: string;
    username?: string;
    email?: string;
    password?: string;

}