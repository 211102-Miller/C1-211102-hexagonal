import { Book } from "./book";


export interface BookRepository{
    createBook(
        title:string,
        author: string,
        img_url:string,
        status:string,
        is_loaded: boolean
    ):Promise<Book | null>;
    
    getAll():Promise<Book[] | null>;

    getBook(id:number):Promise<Book|null>;

    updataStatus(id:number, newStatus: string):Promise<Book | null>;

    getBookInactive(status:string):Promise<Book[]|null>;

    updateBookLead(id:number,is_loaded:boolean ):Promise<Book | null>;

    deleteBook(id:number):Promise<Book | null>;
    
    updateBook(
        id: number,
        title: string,
        author: string,
        img_url: string,
        status: string,
        is_loaded: boolean
    ): Promise<Book | null>

    getBookFilter(
        filter: string,
        title?: string,
        authoe?: string,
    ):Promise<Book| Book[] | null>
    


}