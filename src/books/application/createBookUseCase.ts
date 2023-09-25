import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class CreateBookUserCase{

    constructor (readonly bookRepository: BookRepository){}

    async create(
        title:string,
        author: string,
        img_url: string,
        status:string,
        is_loaded:boolean,

    ):Promise<Book|null>{
        try {
            const createBook = await this.bookRepository.createBook(
                title,
                author,
                img_url,
                status,
                is_loaded
            );
            return createBook;
        } catch (error) {
            return null
        }
    }

}