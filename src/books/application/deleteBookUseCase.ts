import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class DeleteBookUseCase{
    constructor(readonly bookRepository : BookRepository){}

    async deleteBook(id: number): Promise<Book|null> {
        return this.bookRepository.deleteBook(id);
    }

}