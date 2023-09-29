import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";
import { validate } from "class-validator";
import { ValidationIdBook } from "../domain/validation/validationBooks";

export class DeleteBookUseCase{
    constructor(readonly bookRepository : BookRepository){}


    async deleteBook(id: number): Promise<Book|null> {
        
        let valitationPost = new ValidationIdBook(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        return this.bookRepository.deleteBook(id);
    }

    

}