import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class UpdateBookLeadUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async upadateLead(id:number, is_loaded: boolean): Promise<Book | null>{
        try {
            
            const bookToUpdate = await this.bookRepository.getBook(id);
            if(!bookToUpdate){
                return null;
            }

            const updateBook = new Book(
                bookToUpdate.id,
                bookToUpdate.title,
                bookToUpdate.author,
                bookToUpdate.img_url,
                bookToUpdate.status,
                is_loaded
            )
            
            await this.bookRepository.updateBookLead(id,is_loaded);

            return updateBook;

            
        } catch (error) {
            console.error('Error al actualizar el estado del libro:', error);
            return null;
            
        }
    }
}