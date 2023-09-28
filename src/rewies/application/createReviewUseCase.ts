import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class CreateReviewUseCase{
    constructor(readonly reviewRepository:ReviewRepository){}

    async run(
        id_user:number,
        id_book:number,
        review_text:string,
        status:boolean

    ):Promise<Review | null>{
        try {
            const createUser = await this.reviewRepository.createReview(
                id_user,
                id_book,
                review_text,
                status
            )
            return createUser;
        } catch (error) {
            return null
        }
    }
}