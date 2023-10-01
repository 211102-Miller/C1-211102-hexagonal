import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class GetAllReviewAllUseCase{
    constructor (readonly reviewRepository: ReviewRepository){}

    async getAllReviews():Promise<Review[]|null>{
        try {
            const reviews = await this.reviewRepository.getAllReview();
            return  reviews ||[];
        } catch (error) {
            return null;
        }
    }

}