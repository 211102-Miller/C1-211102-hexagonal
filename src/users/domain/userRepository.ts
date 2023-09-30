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

    
    activeUser(id: number): Promise<User | null>;//YAP

    getInactiveUser(): Promise<User[] | User | null>;//YAP

    filterUser( filter: string, email?: string, name?: string ): Promise< User[] | null> //Yap

    updateUserPassword(id: number, newPassword: string): Promise<User | null>; //YAP

    updateUser(id: number,newUser?: { name?: string; password?: string; email?: string; status?: string }): Promise<User | null>; //YAP
    
    deleteReviewUser(id_user: number,id_review:string): Promise<boolean>; //YAP

    loadBookUser(id_user:number,id_book:number):Promise<string |null> //YAP

    returnBookLoad(id_user:number, id_book:number):Promise<string |null> //YAP

    writeReviewUser(id_user:number,id_book:number,review_text:string ):Promise<boolean | null>; //YAP

    updateReviewUser(id_user:number,id_book:number,review_text:string):Promise<boolean | null>
    
    loginUser(email:string,password:string):Promise<User | null>

    signoffUser(id:number):Promise<User| null>


   
    
}