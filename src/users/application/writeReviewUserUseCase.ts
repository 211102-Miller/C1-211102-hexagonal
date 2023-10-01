import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';
import { validate } from 'class-validator';
import { ValidationUserBook } from "../domain/validation/validationUser";

export class WriteReviewUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async write(id_user: number, id_book: number, review_Text: string): Promise<boolean | null> {

        let valitationids = new ValidationUserBook(id_user,id_book,review_Text);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }

        try {
            const writeReview = await this.userRepository.writeReviewUser(id_user, id_book, review_Text);
            return writeReview;
        } catch (error) {
            console.error('Error al escribir la reseña:', error);
            return null;
        }
    }
}
