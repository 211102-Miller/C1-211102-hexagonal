import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class GetReviewUseCase{
    constructor (readonly reviewRepository: ReviewRepository){}

    async getReview(id:number):Promise<Review |Review[]| null>{
        try {
            return this.reviewRepository.getReview(id);
        } catch (error) {
            console.error("Error al obtener la reseña:", error);
            return null;
        }
    }
}