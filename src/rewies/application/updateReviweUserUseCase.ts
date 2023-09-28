
import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";


export class UpdateReviewUserUseCase{
    constructor(readonly reviewRepository:ReviewRepository){}

    async updateReview(id:number,id_User:number, review_text:string):Promise<Review|null>{
        try {
            const reviewUpdate = await this.reviewRepository.putReviewUser(id,id_User,review_text)
            if(!reviewUpdate){
                return null
            }

            const ReviewUser = new Review(
                reviewUpdate.id,
                reviewUpdate.id_user,
                reviewUpdate.id_book,
                review_text,
                reviewUpdate.status
            );

            await this.reviewRepository.putReviewUser(id,id_User,review_text);

            return ReviewUser
        } catch (error) {
            console.error('Error al actualizar el estado del libro:', error);
            return null; 
        }
    }
}