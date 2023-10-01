import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";
import { validate } from "class-validator";
import { ValidationIdReviews } from "../domain/validation/validationReviews";

export class GetReviewUseCase {
    constructor(readonly reviewRepository: ReviewRepository) { }

    async getReview(id: number): Promise<Review | Review[] | null> {

        let valitationPost = new ValidationIdReviews(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            return this.reviewRepository.getReview(id);
        } catch (error) {
            console.error("Error al obtener la reseña:", error);
            return null;
        }
    }
}