import { Address } from "./address";

export interface User extends Address {
    id?: number;
    name: string;
    email: string;
    password: string;
    phone?: string; // Changed from number to string for better phone number handling
}


