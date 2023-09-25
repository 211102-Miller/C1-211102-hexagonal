import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class GetBookUseCasa{
    constructor (readonly bookRepository: BookRepository ){}

    async getBook(id:number):Promise<Book|null>{
        try {
            const books = await this.bookRepository.getBook(id);
            return books;
          } catch (error) {
            console.error("Error al obtener la lista de libros por usuario:", error);
            return null;
          }
    }
}