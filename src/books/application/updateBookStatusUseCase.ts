import { Book } from "../domain/book";
import { BookRepository } from "../domain/bookRepositoy";

export class UpdateStatusUseCase {
  constructor(readonly bookRepository: BookRepository) { }

  async updateStatus(id: number): Promise<{ book: Book | null; message?: string }> {

    // Obtén el libro que deseas actualizar
    const updateStatus = await this.bookRepository.getBook(id);

    if (!updateStatus) {
      return { book: null };
    }
    
    if (!updateStatus.status) {
      return { book: updateStatus, message: 'El campo "status" ya estaba en false.' };
    }

    const statusUpdate = await this.bookRepository.updataStatus(id);

    if (!statusUpdate) {
      return { book: null }; // Error al actualizar la revisión
    }
    return { book: statusUpdate };

  }
}