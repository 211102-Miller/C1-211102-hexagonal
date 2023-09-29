import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class GetBooksUseCase{
    constructor (readonly bookRepository : BookRepository){}

    async getAll():Promise<Book[]|null>{
        try {
            const book = await this.bookRepository.getAll();
            return book;
        } catch (error) {
            return null;
        }
    }


}