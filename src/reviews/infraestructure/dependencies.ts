import { MysqlReviewRepository } from "./mysqlReviewRepository";

import { CreateReviewUseCase } from "../application/createReviewUseCase";
import { GetAllReviewAllUseCase } from "../application/getReviewAllUseCase";
import { GetReviewUseCase } from "../application/getReviewUseCase";
import { UpdateReviewInactiveUseCase } from "../application/updateReviewInactiveUseCase";
import { GetReviewsInactiveUseCase } from "../application/getReviewsInactiveUseCase";
import { DeleteReviewUseCase } from "../application/deleteReviewUseCase";
import { GetFilterReviewUserUseCase } from "../application/getFilterReviewUserUseCase";

import { CreateReviewController} from "./controllers/createReviewController";
import { GetAllReviewsController } from "./controllers/getReviewAllController";
import { GetReviewController } from "./controllers/getReviewController";
import { UpdateReviewInactiveController } from "./controllers/updateReviewInactiveController";
import { GetReviewsInactiveController } from "./controllers/getReviewsInactiveController";
import { DeleteReviewController } from "./controllers/deleteReviewController";
import { GetFilterReviewUserController } from "./controllers/getFilterReviewController";

export const mysqlReviewRepository = new MysqlReviewRepository();

//Use case
export const createReviewUseCase = new CreateReviewUseCase(mysqlReviewRepository);
export const getAllReviewAllUseCase = new GetAllReviewAllUseCase(mysqlReviewRepository);
export const getReviewUseCase = new GetReviewUseCase(mysqlReviewRepository);
export const updateReviewInactiveUseCase = new UpdateReviewInactiveUseCase(mysqlReviewRepository)
export const getReviewsInactiveUseCase = new GetReviewsInactiveUseCase(mysqlReviewRepository);
export const deleteReviewUseCase = new DeleteReviewUseCase(mysqlReviewRepository);
export const getFilterReviewUserUseCase = new GetFilterReviewUserUseCase(mysqlReviewRepository);
//Controllers
export const createReviewController = new CreateReviewController(createReviewUseCase);
export const getAllReviewsController = new GetAllReviewsController(getAllReviewAllUseCase)
export const getReviewController = new GetReviewController(getReviewUseCase);
export const updateReviewInactiveController = new UpdateReviewInactiveController(updateReviewInactiveUseCase);
export const getReviewsInactiveController = new GetReviewsInactiveController(getReviewsInactiveUseCase)
export const deleteReviewController = new DeleteReviewController(deleteReviewUseCase)
export const getFilterReviewUserController = new GetFilterReviewUserController(getFilterReviewUserUseCase);