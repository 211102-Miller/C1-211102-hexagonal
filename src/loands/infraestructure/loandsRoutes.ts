import * as express from 'express';
import { getAllLoanController,
    getLoandController,
    deleteLoanController 
} from './dependencies';

export const loandRouter = express.Router();

loandRouter.get(
    "/All",
    getAllLoanController.getAllLoand.bind(getAllLoanController)
)

loandRouter.get(
    "/:id",
    getLoandController.getLoand.bind(getLoandController)
)
loandRouter.delete(
    "/delete/:id",
    deleteLoanController.deleteLoand.bind(deleteLoanController)
)