import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class GetBookFilterUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async fliterBook(filter: string, title?:string, author?: string):Promise<Book[] |null>{
        try {
            const listFilter = await this.bookRepository.getBookFilter(filter,title,author);
            return listFilter
        } catch (error) {
            return null
        }
    }
}