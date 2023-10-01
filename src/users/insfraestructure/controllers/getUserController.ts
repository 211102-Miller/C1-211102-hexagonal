import { Response,Request } from "express";
import { GetUserUseCase } from "../../application/getUserUseCase";

export class GetUserController{

    constructor (readonly getUserUseCase : GetUserUseCase){}

    async getUserId(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const iduser = await this.getUserUseCase.getUserId(id);
            
            if (iduser) {
              return res.status(200).json({
                status: "success",
                data: iduser,
                message: "Lista de libros por usuario obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron libros por usuario",
              });
            }
          } catch (error) {
            if (error instanceof Error) {

              if (error.message.startsWith('[')) {
                
                return res.status(400).send({
                  status: "error",
                  message: "Validation failed",
                  errors: JSON.parse(error.message)
                });
              }
            }
            return res.status(500).send({
              status: "error",
              message: "An error occurred while adding the book."
            });
          }
          }
}
