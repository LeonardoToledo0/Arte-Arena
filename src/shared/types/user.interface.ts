export interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    password?: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        street: string;
        number: string;
        city: string;
        zipcode: string;
        geolocation?: {
            lat: string;
            long: string;
        };
    };
}
