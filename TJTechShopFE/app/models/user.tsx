export interface UserModel {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    create_time?: string;
    role_id: number;
    age:  number;
    phone_number: string;
}