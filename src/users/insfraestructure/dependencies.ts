import { CreateUserUseCase} from "../application/createUserUseCase";
import { GetUserAllUseCase } from "../application/getUserAllUseCase";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { GetUserUseCase } from "../application/getUserUseCase";
import { ActiveUserUseCase } from "../application/activateUserUseCase"
import { GetInactiveUserUseCase } from "../application/getInactiveUserUseCase";
import { GetFilterUserUseCase } from "../application/getFilterUserUseCase";
import { UpdatePasswordUserUseCase } from "../application/updateUserPasswordUseCase";
import { UpdateUserUseCase } from "../application/updateUserUseCase";
import { DeleterReviewUserUseCase } from "../application/deleteReviewUserUseCase";
import { LoadBookUserUseCase } from "../application/loadBookUserUseCase";
import { ReturnBookLoadUseCase } from "../application/returnBookLoadUseCase";
import { WriteReviewUserUseCase } from "../application/writeReviewUserUseCase";
import { UpdateReviewUserUseCase } from "../application/updateReviewUserUseCase";
import { LoginUserUseCase } from "../application/loginUserUseCase";
import { SingOffUserUseCase } from "../application/signOffUserUseCase";

import { CreateUserController} from "./controllers/createUserController";
import { GetUserAllContoller } from "./controllers/getUserAllController";
import { DeleteUserController } from "./controllers/deleteUserController";
import { GetUserController } from "./controllers/getUserController";
import { ActiveUserController } from "./controllers/activateUserControlller";
import { GetInactiveUserController } from "./controllers/getInactiveUserController";
import { GetFilterUserController } from "./controllers/updateFilterUserControlller";
import { UpdateUserPasswordController } from "./controllers/updateUserPasswordController";
import { UpdateUserController } from "./controllers/updateUserController";
import { DeleteReviewUserController } from "./controllers/deleteReviewUserController";
import { LoadBookUserController } from "./controllers/loadBookUserController";
import { ReturnBookLoadController } from "./controllers/returnBookLoadController";
import { WriteReviewUserController } from "./controllers/writeReviewUserController";
import { UpdateReviewUserController } from "./controllers/updateReviewUserController";
import { LoginUserController } from "./controllers/loginUserController";
import { SingOffUserController } from "./controllers/singOffUserController";

import { MysqlUserRepository } from "./mysqlUserRepository";


export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const getUserAllUseCase = new GetUserAllUseCase(mysqlUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const getUserUseCase = new GetUserUseCase(mysqlUserRepository)
export const activeUserUseCase = new ActiveUserUseCase(mysqlUserRepository);
export const getInactiveUserUseCase = new GetInactiveUserUseCase(mysqlUserRepository);
export const getFilterUserUseCase = new GetFilterUserUseCase(mysqlUserRepository);
export const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(mysqlUserRepository);
export const updateUserUseCase = new UpdateUserUseCase (mysqlUserRepository);
export const deleterReviewUserUseCase = new DeleterReviewUserUseCase(mysqlUserRepository)
export const loadBookUserUseCase = new LoadBookUserUseCase(mysqlUserRepository)
export const returnBookLoadUseCase = new ReturnBookLoadUseCase(mysqlUserRepository)
export const writeReviewUserUseCase = new WriteReviewUserUseCase(mysqlUserRepository)
export const updateReviewUserUseCase = new UpdateReviewUserUseCase(mysqlUserRepository)
export const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository)
export const singOffUserUseCase = new SingOffUserUseCase(mysqlUserRepository)



export const createUserController = new CreateUserController(createUserUseCase);
export const getUserAllController = new GetUserAllContoller(getUserAllUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getUserController = new GetUserController(getUserUseCase)
export const activeUserController = new ActiveUserController(activeUserUseCase);
export const getInactiveUserController = new GetInactiveUserController(getInactiveUserUseCase);
export const getFilterUserController = new GetFilterUserController(getFilterUserUseCase);
export const updatePasswordUserController = new UpdateUserPasswordController(updatePasswordUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);
export const deleteReviewUserController = new DeleteReviewUserController(deleterReviewUserUseCase)
export const loadBookUserController = new LoadBookUserController(loadBookUserUseCase)
export const returnBookLoadController = new ReturnBookLoadController(returnBookLoadUseCase)
export const writeReviewUserController = new WriteReviewUserController(writeReviewUserUseCase)
export const updateReviewUserController = new UpdateReviewUserController(updateReviewUserUseCase)
export const loginUserController = new LoginUserController(loginUserUseCase)
export const singOffUserController = new SingOffUserController(singOffUserUseCase);