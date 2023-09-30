import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';

export class WriteReviewUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async write(id_user: number, id_book: number, review_Text: string): Promise<boolean | null> {
        try {
            const writeReview = await this.userRepository.writeReviewUser(id_user, id_book, review_Text);
            return writeReview;
        } catch (error) {
            console.error('Error al escribir la reseña:', error);
            return null;
        }
    }
}
