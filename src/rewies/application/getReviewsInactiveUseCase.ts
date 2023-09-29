import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";


export class GetReviewsInactiveUseCase{
    constructor(readonly reviewRepository:ReviewRepository){}

    async reviewsInactive(status:boolean):Promise<Review[]|null>{
        try {
            const inactiveReviews = await this.reviewRepository.getReviewsInactive(status);
            return inactiveReviews;
        } catch (error) {
        console.error("Error al obtener la lista de reseñas inactivos:", error);
          return null;
        }
    }
}