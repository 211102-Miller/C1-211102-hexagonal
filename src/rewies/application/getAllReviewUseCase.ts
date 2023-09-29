import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class GetReviewAllUseCase{
    constructor (readonly reviewRepository: ReviewRepository){}

    async getAllReviews():Promise<Review[]|null>{
        try {
            const reviews = await this.reviewRepository.getAllReview();
            return reviews;
        } catch (error) {
            return null;
        }
    }

}