import { Book } from "./book";


export interface BookRepository{
    createBook(
        title:string,
        author: string,
        img_url:string,
        status:boolean,
        is_loaded: boolean
    ):Promise<Book | null>;
    
    getAll():Promise<Book[] | null>;

    getBook(id:number):Promise<Book|null>;

    updataStatus(id:number):Promise<Book | null>;

    getBookInactive(status:boolean):Promise<Book[]|null>;

    updateBookLead(id:number):Promise<Book | null>;

    updateBookStore(id:number):Promise<Book | null>;

    deleteBook(id:number):Promise<Book | null>;

    getBookReview():Promise<any[]| null>
    
    updateBook(
        id: number,
        title: string,
        author: string,
        img_url: string,
        status: boolean,
        is_loaded: boolean
    ): Promise<Book | null>

    getBookFilter(
        filter: string,
        title?: string,
        author?: string,
    ):Promise<Book[] | null>
    


}