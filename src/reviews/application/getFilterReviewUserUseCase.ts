import { ReviewRepository } from "../domain/reviewRepository";
import { Review } from "../domain/review";

export class GetFilterReviewUserUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getFilterReviewUser(id_User: number): Promise<Review |Review[] | null> {
      try {
        const reviews = await this.reviewRepository.getFilterReviewUser(id_User);
        return reviews || [];
      } catch (error) {
          return null
      }
    
  }
}