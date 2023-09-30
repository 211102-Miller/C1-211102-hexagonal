import express from "express";
import{
    createListReadController,
    getAllListReadController,
    getAllStatusContoller,
    createUrlUseController

} from "./depenciesListRead";



export const leadRoutes = express.Router();

leadRoutes.post(
    "/add", createListReadController.createListRead.bind(createListReadController)
);

leadRoutes.get(
    "/getAll", getAllListReadController.getAll.bind(getAllListReadController)
);

leadRoutes.get(
    "/active", getAllStatusContoller.run.bind(getAllStatusContoller)
);
leadRoutes.get(
    "/active", createUrlUseController.create.bind(createUrlUseController)
);