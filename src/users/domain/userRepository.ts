import { User } from "./user";

export interface UserRepository{
    createUser(
        name:String, 
        passwordpassword:String, 
        email:String, 
        status:boolean 
    ): Promise<User | null>; //YAP

     
    getAllUsers(): Promise<User[]>; //YAP

    deleteUser(userId:string): Promise<boolean>; //YAP

    getUser(id:number): Promise<User | null> //YAP

    
    activeUser(id: number): Promise<User | null>;

    getInactiveUser(): Promise<User[] | User | null>;

    filterUser( filter: string, email?: string, name?: string ): Promise<User | User[] | null>

    updateUserPassword(id: number, newPassword: string): Promise<User | null>;

    updateUser(id: number,newUser?: { name?: string; password?: string; email?: string; status?: string }): Promise<User | null>;


   
    
}