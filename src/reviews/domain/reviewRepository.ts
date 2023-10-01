import { Review } from "./review";


export interface ReviewRepository {

    getAllReview():Promise<Review[] | null>
}