import { MysqlReviewRepository } from "./mysqlReviewRepository";

import { GetAllReviewAllUseCase } from "../application/getReviewAllUseCase";

import { GetAllReviewsController} from "./controllers/getReviewAllController";



export const mysqlReviewRepository = new MysqlReviewRepository();


export const getAllReviewAllUseCase = new GetAllReviewAllUseCase(mysqlReviewRepository);

export const getAllReviewsController = new GetAllReviewsController(getAllReviewAllUseCase);