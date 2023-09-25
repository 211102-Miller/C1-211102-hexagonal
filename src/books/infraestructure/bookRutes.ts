import { 
    createBookController, 
    getBooksController, 
    getBookController, 
    updateStatusController,
    getBookInactiveController,
    updateBookLeadController,
    deleteBookControlller,
    updateBookController,
    getBookFilterController
} from "./depencies";
import express from "express";

export const bookRoutes = express.Router();


bookRoutes.post(
    "/addBook", createBookController.create.bind(createBookController)
);

bookRoutes.get(
    "/getAll", getBooksController.getAll.bind(getBooksController)
)

bookRoutes.get(
    "/getBook/:id", getBookController.getBook.bind(getBookController)
)
bookRoutes.put(
    "/putLibro", updateStatusController.updateStatus.bind(updateStatusController)
)
bookRoutes.get(
    "/getInactivate", getBookInactiveController.getBookInactive.bind(getBookInactiveController)
)
bookRoutes.put(
    "/putLead", updateBookLeadController.updateBookLead.bind(updateBookLeadController)
)

bookRoutes.delete(
    "/deleteBook/:id", deleteBookControlller.deleteBook.bind(deleteBookControlller)
)
bookRoutes.patch(
    "/putBook/:id", updateBookController.update.bind(updateBookController)
)
bookRoutes.get(
    "/getFilter/", getBookFilterController.bookFilter.bind(getBookFilterController)
)

