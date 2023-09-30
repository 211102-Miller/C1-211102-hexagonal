import { User } from "./user";

export interface UserRepository{
    createUser(name:String, password:String, email:String, status:boolean ): Promise<User | null>; //YAP //Ya esta validado :D

     
    getAllUsers(): Promise<User[]>; //YAP

    deleteUser(userId:string): Promise<boolean>; //YAP //Ya se aplico

    getUser(id:number): Promise<User | null> //YAP //Ya se aplico

    
    activeUser(id: number): Promise<User | null>;//YAP //Ya se aplico

    getInactiveUser(): Promise<User[] | User | null>;//YAP

    filterUser( filter: string, email?: string, name?: string ): Promise< User[] | null> //Yap

    updateUserPassword(id: number, newPassword: string): Promise<User | null>; //YAP //Ya se aplico

    updateUser(id: number,newUser?: { name?: string; password?: string; email?: string; status?: string }): Promise<User | null>; //YAP //Ya estan las validaciones de este campo
    
    deleteReviewUser(id_user: number,id_review:string): Promise<boolean>; //YAP //Ya se aplico

    loadBookUser(id_user:number,id_book:number):Promise<string |null> //YAP //ya se aplico

    returnBookLoad(id_user:number, id_book:number):Promise<string |null> //YAP //ya se aplico

    writeReviewUser(id_user:number,id_book:number,review_text:string ):Promise<boolean | null>; //YAP //Ya se aplico

    updateReviewUser(id_user:number,id_book:number,review_text:string):Promise<boolean | null>  // ya se aplico
    
    loginUser(email:string,password:string):Promise<User | null>

    signoffUser(id:number):Promise<User| null> //Ya se aplico


   
    
}