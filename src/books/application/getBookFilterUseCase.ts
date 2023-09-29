import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";
import { validate } from "class-validator";
import { ValidatorFilter } from "../domain/validation/validationBooks";

export class GetBookFilterUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async fliterBook(filter: string, title?:string, author?: string):Promise<Book[] |null>{
        let valitationPost = new ValidatorFilter(filter,title, author);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const listFilter = await this.bookRepository.getBookFilter(filter,title,author);
            return listFilter
        } catch (error) {
            return null
        }
    }
}