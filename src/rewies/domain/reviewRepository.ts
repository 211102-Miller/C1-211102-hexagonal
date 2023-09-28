import { Review} from "./review";

export interface ReviewRepository{
    createReview(
        id_user:number,
        id_book:number,
        review_texr:string,
        status: boolean
    ): Promise <Review | null>

    getAllReview():Promise<Review[] | null>;

    getReview(id:number):Promise< Review| Review[]| null>;

    updateReviweInactive(id: number): Promise<Review | null>;

    getReviewsInactive(status:boolean):Promise<Review[]|null>;

    deleteReview(id:number, id_User:number):Promise<Review | null>;

    deleteReview(id:number, id_User:number):Promise<Review | null>;

    getFilterReviewUser(id_User:number):Promise<Review[]| null>

    putReviewUser(id:number,id_User:number,review_text:string):Promise<Review| null>;
}