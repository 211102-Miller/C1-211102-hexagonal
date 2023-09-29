import { Book } from "./book";


export interface BookRepository{
    createBook(
        title:string,
        author: string,
        img_url:string,
        status:boolean,
        is_loaded: boolean
    ):Promise<Book | null>; //YAP
    
    getAll():Promise<Book[] | null>;

    getBook(id:number):Promise<Book|null>; //YAP

    updataStatus(id:number):Promise<Book | null>; //YAP

    getBookInactive(status:boolean):Promise<Book[]|null>; 

    updateBookLead(id:number):Promise<Book | null>; //YAP DIGAMOS

    updateBookStore(id:number):Promise<Book | null>;//YAP

    deleteBook(id:number):Promise<Book | null>; //YAP

    getBookReview():Promise<any[]| null>
    
    updateBook(
        id: number,
        title: string,
        author: string,
        img_url: string,
        status: boolean,
        is_loaded: boolean
    ): Promise<Book | null> //Yap

    getBookFilter(
        filter: string,
        title?: string,
        author?: string,
    ):Promise<Book[] | null>
    


}