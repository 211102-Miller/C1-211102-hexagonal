import { MysqlLoandsRepository } from "./mysqlLoandsRepository";

import { GetAllLoandsUseCase} from "../application/getAllLoandsUseCase";
import { GetLoandUseCase } from "../application/getLoandUseCase";
import { DeleteLoanUseCase } from "../application/deleleteLoandUseCase";


import { GetAllLoanController } from "./controllers/getAllLoandsController";
import { GetLoandController } from "./controllers/getLoandController";
import { DeleteLoanController } from "./controllers/deleteLoandsController";


export const mysqlLoandsRepository = new MysqlLoandsRepository();


export const getAllLoandsUseCase = new GetAllLoandsUseCase(mysqlLoandsRepository);
export const getLoandUseCase = new GetLoandUseCase(mysqlLoandsRepository)
export const deleteLoanUseCase = new DeleteLoanUseCase(mysqlLoandsRepository)

export const getAllLoanController = new GetAllLoanController(getAllLoandsUseCase);
export const getLoandController = new GetLoandController(getLoandUseCase)
export const deleteLoanController = new DeleteLoanController(deleteLoanUseCase)