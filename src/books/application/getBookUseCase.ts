import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";
import { validate } from "class-validator";
import { ValidationIdBook } from "../domain/validation/validationBooks";
export class GetBookUseCasa {
  constructor(readonly bookRepository: BookRepository) { }

  async getBook(id: number): Promise<Book | null> {

    let valitationPost = new ValidationIdBook(id);
    const validation = await validate(valitationPost)
    
    if (validation.length > 0) {
      throw new Error(JSON.stringify(validation));
    }

    try {
      const books = await this.bookRepository.getBook(id);
      return books;
    } catch (error) {
      console.error("Error al obtener la lista de libros por usuario:", error);
      return null;
    }
  }
}