import * as express from 'express';
import { getAllReviewsController } from './dependencies';


export const loandReviews = express.Router();


loandReviews.get(
    "/All",
    getAllReviewsController.AllReviews.bind(getAllReviewsController)
)