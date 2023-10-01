import { query } from "../../database/mysqlUserRepository";
import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class MysqlReviewRepository implements ReviewRepository{

    async getAllReview():Promise<Review[]|null>{
        const sql ="SELECT * FROM REVIEW"
        try {
            const [result]:any = await query(sql,[]);
            const dataReviews = Object.values(JSON.parse(JSON.stringify(result)));
            
            return (dataReviews).map((review:any) =>
                new Review(
                    review.id,
                    review.id_User,
                    review.id_Book,
                    review.review_text,
                    review.status
                )
            )
        } catch (error) {
            console.error("Error al obtener la lista de reseñas:", error);
            return null;
        }
    }
}