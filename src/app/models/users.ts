import { Address } from "./address";

export interface User extends Address {
    id?: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
}


