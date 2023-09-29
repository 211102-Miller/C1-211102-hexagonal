
import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class DeleteReviewUseCase{
    constructor (readonly reviewRepository:ReviewRepository ){}

    async deleteReview(id:number, id_User:number): Promise<Review|null>{
        try {
            return await this.reviewRepository.deleteReview(id,id_User)
        } catch (error) {
            return null
        }
    }
}