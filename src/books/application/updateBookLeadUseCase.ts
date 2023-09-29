import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";
import { validate } from "class-validator";
import { ValidationIdBook } from "../domain/validation/validationBooks";


export class UpdateBookLeadUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async updateLoad(id: number): Promise<{ book: Book | null; message?: string }>{
        const getLoad = await this.bookRepository.getBook(id);
        if (!getLoad) {
            return { book: null };
        }
        if (getLoad.status) {
            return { book: getLoad, message: 'El campo "Load" ya estaba en true.' };
        }
        
        let valitationPost = new ValidationIdBook(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        const loadUpdate = await this.bookRepository.updateBookLead(id)

        if (!loadUpdate) {
            return { book: null }; // Error al actualizar la revisión
          }
          return { book: loadUpdate };
    }
}