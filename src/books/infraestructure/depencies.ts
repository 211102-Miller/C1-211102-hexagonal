import { CreateBookUserCase } from "../application/createBookUseCase";
import { GetBooksUseCase } from "../application/getBooksUseCase";
import { GetBookUseCasa } from "../application/getBookUseCase";
import { UpdateStatusUseCase } from "../application/updateBookStatusUseCase";
import { GetBookInactiveUseCase } from "../application/getBookInactiveUseCase";
import { UpdateBookLeadUseCase } from "../application/updateBookLeadUseCase";
import { DeleteBookUseCase } from "../application/deleteBookUseCase";
import { UpdateBookUseCase } from "../application/updateBookUseCase";
import { GetBookFilterUseCase } from "../application/getBookFilterUseCase";

import { GetBookController } from "./controllers/getBookController";
import { CreateBookController } from "./controllers/createBookController";
import { GetBooksController } from "./controllers/getBooksController";
import { UpdateStatusController } from "./controllers/updateBookStateController";
import { GetBookInactiveController } from "./controllers/getBookInactiveController";
import { UpdateBookLeadController } from "./controllers/updateBookLeadController";
import { DeleteBookController } from "./controllers/deleteBookControlller";
import { UpdateBookController } from "./controllers/updateBookController";
import { GetBookFilterController } from "./controllers/getBookFilterController";

import { MysqlBookRepository } from "./mysqlBookRepository";

//Base de datos
export const mysqlBookRepository = new MysqlBookRepository();

//Casos de uso
export const createBookUserCase = new CreateBookUserCase(mysqlBookRepository);
export const getBooksUseCase = new GetBooksUseCase(mysqlBookRepository);
export const getBookUserCase = new GetBookUseCasa(mysqlBookRepository);
export const updateStatusUseCase = new UpdateStatusUseCase(mysqlBookRepository);
export const getBookInactiveUseCase = new GetBookInactiveUseCase(mysqlBookRepository);
export const updateBookLeadUseCase = new UpdateBookLeadUseCase(mysqlBookRepository);
export const deleteBookUserCase = new DeleteBookUseCase(mysqlBookRepository);
export const updateBookUseCase = new UpdateBookUseCase(mysqlBookRepository);
export const getBookFilterUseCase = new GetBookFilterUseCase(mysqlBookRepository);

//Controladores
export const createBookController = new CreateBookController(createBookUserCase);
export const getBooksController = new GetBooksController(getBooksUseCase);
export const getBookController = new GetBookController(getBookUserCase);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);
export const getBookInactiveController = new GetBookInactiveController(getBookInactiveUseCase);
export const updateBookLeadController = new UpdateBookLeadController(updateBookLeadUseCase);
export const deleteBookControlller = new DeleteBookController(deleteBookUserCase);
export const updateBookController = new UpdateBookController(updateBookUseCase);
export const getBookFilterController = new GetBookFilterController(getBookFilterUseCase);


