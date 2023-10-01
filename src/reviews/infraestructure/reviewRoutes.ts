import express  from "express";
import { 
    createReviewController,
    getAllReviewsController,
    getReviewController,
    updateReviewInactiveController,
    getReviewsInactiveController,
    deleteReviewController,
    getFilterReviewUserController
} from "./dependencies";


export const loandReviews = express.Router();


loandReviews.get(
    "/All",
    getAllReviewsController.AllReviews.bind(getAllReviewsController)
)
loandReviews.post(
    "/create", createReviewController.Review.bind(createReviewController)
)
loandReviews.get(
    "/User/:id", getReviewController.getReview.bind(getReviewController)
)
loandReviews.put(
    "/inactive/:id", updateReviewInactiveController.updateReviewInactive.bind(updateReviewInactiveController)
)
loandReviews.put(
    "/inactive/:id", updateReviewInactiveController.updateReviewInactive.bind(updateReviewInactiveController)
)
loandReviews.get(
    "/AllInactive", getReviewsInactiveController.reviewInactive.bind(getReviewsInactiveController)
)
loandReviews.delete(
    "/delete/:id/:id_User", deleteReviewController.deleteReview.bind(deleteReviewController)
)
loandReviews.get(
    "/filter/:id_User", getFilterReviewUserController.getFilterReviewUser.bind(getFilterReviewUserController)
)