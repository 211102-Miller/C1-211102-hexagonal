import { Request,Response } from "express-serve-static-core";
import { GetAllListReadUseCase } from "../../application/getAllListReadUseCase";


export class GetAllListReadController{
    constructor(readonly getAllListReadUseCase:GetAllListReadUseCase){}

    async getAll(req:Request, res:Response){
        try {
            const lead = await this.getAllListReadUseCase.getAll();
            if (lead) {
              return res.status(200).json({
                status: "success",
                data: lead,
                message: "Lista de libros obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron listas",
              });
            }
        } catch (error) {
            return null;
        }
    }

}