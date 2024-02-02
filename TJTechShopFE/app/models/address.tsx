import { UserModel } from "./user";

export interface AddressModel {
    address_id?: number;
    user_id: number;
    user?: UserModel;
    street: string;
    apt: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
    active: boolean;
}