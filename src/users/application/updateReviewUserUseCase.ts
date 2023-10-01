import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from 'class-validator';
import { ValidationUserBook } from "../domain/validation/validationUser";

export class UpdateReviewUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async updateReview(id_user: number,id_book: number,updated_Review: string): Promise<boolean | null> {

    let valitationids = new ValidationUserBook(id_user,id_book,updated_Review);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }

    try {
      const updated = await this.userRepository.updateReviewUser(id_user,id_book,updated_Review);
      return updated;
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
      return null;
    }
  }
}
