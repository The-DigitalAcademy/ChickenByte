export interface User {
    name: string;
    email: string;
    password: string;
}

export interface UserAddress extends User{
    streetNumer: string;
    surburb: string;
    city: string;
}

export interface UserNumber extends UserAddress{
    phoneNumber: number;
}
