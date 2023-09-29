import { CreateUserUseCase} from "../application/createUserUseCase";
import { GetUserAllUseCase } from "../application/getUserAllUseCase";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { GetUserUseCase } from "../application/getUserUseCase";
import { ActiveUserUseCase } from "../application/activateUserUseCase"
import { GetInactiveUserUseCase } from "../application/getInactiveUserUseCase";
import { UpdateFilterUserUseCase } from "../application/updateFilterUserUseCase";
import { UpdatePasswordUserUseCase } from "../application/updateUserPasswordUseCase";
import { UpdateUserUseCase } from "../application/updateUserUseCase";

import { CreateUserController} from "./controllers/createUserController";
import { GetUserAllContoller } from "./controllers/getUserAllController";
import { DeleteUserController } from "./controllers/deleteUserController";
import { GetUserController } from "./controllers/getUserController";
import { ActiveUserController } from "./controllers/activateUserControlller";
import { GetInactiveUserController } from "./controllers/getInactiveUserController";
import { UpdateFilterUserController } from "./controllers/updateFilterUserControlller";
import { UpdatePasswordUserController } from "./controllers/updateUserPasswordController";
import { UpdateUserController } from "./controllers/updateUserController";

import { MysqlUserRepository } from "./mysqlUserRepository";


export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const getUserAllUseCase = new GetUserAllUseCase(mysqlUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const getUserUseCase = new GetUserUseCase(mysqlUserRepository)
export const activeUserUseCase = new ActiveUserUseCase(mysqlUserRepository);
export const getInactiveUserUseCase = new GetInactiveUserUseCase(mysqlUserRepository);
export const updateFilterUserUseCase = new UpdateFilterUserUseCase(mysqlUserRepository);
export const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(mysqlUserRepository);
export const updateUserUseCase = new UpdateUserUseCase (mysqlUserRepository);

export const createUserController = new CreateUserController(createUserUseCase);
export const getUserAllController = new GetUserAllContoller(getUserAllUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getUserController = new GetUserController(getUserUseCase)
export const activeUserController = new ActiveUserController(activeUserUseCase);
export const getInactiveUserController = new GetInactiveUserController(getInactiveUserUseCase);
export const updateFilterUserController = new UpdateFilterUserController(updateFilterUserUseCase);
export const updatePasswordUserController = new UpdatePasswordUserController(updatePasswordUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);