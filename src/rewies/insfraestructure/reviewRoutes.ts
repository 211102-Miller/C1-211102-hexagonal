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

export const reviewRoutes = express.Router();

reviewRoutes.post(
    "/create", createReviewController.Review.bind(createReviewController)
)
reviewRoutes.get(
    "/getAll", getAllReviewsController.listAllReviews.bind(getAllReviewsController)
)
reviewRoutes.get(
    "/User/:id", getReviewController.getReview.bind(getReviewController)
)
reviewRoutes.put(
    "/inactive/:id", updateReviewInactiveController.updateReviewInactive.bind(updateReviewInactiveController)
)
reviewRoutes.put(
    "/inactive/:id", updateReviewInactiveController.updateReviewInactive.bind(updateReviewInactiveController)
)
reviewRoutes.get(
    "/AllInactive", getReviewsInactiveController.reviewInactive.bind(getReviewsInactiveController)
)
reviewRoutes.delete(
    "/delete/:id/:id_User", deleteReviewController.deleteReview.bind(deleteReviewController)
)
reviewRoutes.get(
    "/filter/:id_User", getFilterReviewUserController.getFilterReviewUser.bind(getFilterReviewUserController)
)

