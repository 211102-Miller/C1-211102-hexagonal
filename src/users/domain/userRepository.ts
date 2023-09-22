import { User } from "./user";

export interface BookRepository{
    postUser(
        name:string,
        last_name: string,
        email: string,
        password: string,
        phone: string,
        status: boolean
        ):Promise<User| null>;
}