import { MysqListReadRepository } from "./mysqListReadRepository";
 
import { CreateListReadUserCase } from "../application/createListReadUseCase";
import { GetAllListReadUseCase } from "../application/getAllListReadUseCase";
import { GetAllStatusUseCase } from "../application/getAllStatusUseCase";
import { CreateUrlUseCase } from "../application/createUrlUseCase";

import { CreateListReadController} from "./controllers/createListReadController";
import { GetAllListReadController } from "./controllers/getAllListReadController";
import { GetAllStatusContoller } from "./controllers/getAllStatusController";
import { CreateUrlUseController } from "./controllers/createUrlController";

export const mysqListReadRepository = new MysqListReadRepository();


export const createListReadUserCase = new CreateListReadUserCase(mysqListReadRepository)
export const getAllListReadUseCase = new GetAllListReadUseCase(mysqListReadRepository);
export const getAllStatusUseCase = new GetAllStatusUseCase(mysqListReadRepository);
export const createUrlUseCase = new CreateUrlUseCase(mysqListReadRepository)

export const createListReadController = new CreateListReadController(createListReadUserCase)
export const getAllListReadController = new GetAllListReadController(getAllListReadUseCase)
export const getAllStatusContoller = new GetAllStatusContoller(getAllStatusUseCase)
export const createUrlUseController = new CreateUrlUseController(createUrlUseCase)