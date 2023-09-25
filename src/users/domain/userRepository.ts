import { User } from "./user";

export interface UserRepository{
    createUser(
        name:string,
        email: string,
        password: string,
        phone: string,
        status: boolean
        ):Promise<User | null>;
   
    
}