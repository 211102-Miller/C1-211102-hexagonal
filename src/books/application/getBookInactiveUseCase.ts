import { Book } from "../domain/book";
import { BookRepository} from "../domain/bookRepositoy";

export class GetBookInactiveUseCase{
    constructor(readonly bookRepository: BookRepository ){}

    async getInactive(status: boolean): Promise<Book[] | null> {
        try {
          // Llama al método del repositorio que obtiene los libros inactivos
          const inactiveBooks = await this.bookRepository.getBookInactive(status);
    
          return inactiveBooks;
        } catch (error) {
          console.error("Error al obtener la lista de libros inactivos:", error);
          return null; // Puedes manejar el error de alguna manera adecuada
        }
      }
}