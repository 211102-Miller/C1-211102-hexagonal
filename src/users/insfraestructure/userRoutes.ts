import express  from "express";
import { 
    createUserController,
    getUserAllController,
    deleteUserController,
    getUserController,
    activeUserController,
    getInactiveUserController,
    getFilterUserController,
    updatePasswordUserController,
    updateUserController,
    deleteReviewUserController,
    loadBookUserController,
    returnBookLoadController,
    writeReviewUserController,
    updateReviewUserController,
    loginUserController,
    singOffUserController
    
} from "./dependencies";

export const userRoutes = express.Router();


userRoutes.post(
    "/post",
    createUserController.addUser.bind(createUserController)
);
userRoutes.get(
    "/All",
    getUserAllController.listAllUsers.bind(getUserAllController)
);
userRoutes.delete(
    "/delete/:userId",
    deleteUserController.deleteUser.bind(deleteUserController)
)
userRoutes.get(
    "/getUser/:id",
    getUserController.getUserId.bind(getUserController)
)

userRoutes.put(
    "/activateUser/:id",
    activeUserController.run.bind(activeUserController)
)
userRoutes.get(
    "/inactiveUsers",
    getInactiveUserController.run.bind(getInactiveUserController)
)
userRoutes.get(
    '/filter/',
    getFilterUserController.run.bind(getFilterUserController)
);
userRoutes.put(
    '/updatePassword/',
    updatePasswordUserController.updatePassword.bind(updatePasswordUserController)
)
//actualizar datos del usuario
userRoutes.put(
    '/updateUser/',
    updateUserController.updateUser.bind(updateUserController)
)
userRoutes.delete(
    "/delete/:userId",
    deleteUserController.deleteUser.bind(deleteUserController)
)
userRoutes.delete(
    "/delete/review/:id_user/:id_review",
    deleteReviewUserController.deleteReview.bind(deleteReviewUserController)
)
userRoutes.post(
    "/load/book", loadBookUserController.loadBook.bind(loadBookUserController)
)
userRoutes.put(
    "/return/book/loands", returnBookLoadController.returnLead.bind(returnBookLoadController)
)
userRoutes.post(
    "/write/review/book", writeReviewUserController.writeReview.bind(writeReviewUserController)
)
userRoutes.put(
    "/update/review/book", updateReviewUserController.updateReview.bind(updateReviewUserController)
)
userRoutes.post(
    "/login", loginUserController.loginUser.bind(loginUserController)
)
userRoutes.post(
    "/singOff", singOffUserController.singOff.bind(singOffUserController)
)

