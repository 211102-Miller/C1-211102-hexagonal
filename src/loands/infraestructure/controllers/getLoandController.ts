import { Response,Request } from "express";
import { GetLoandUseCase } from "../../application/getLoandUseCase";


export class GetLoandController{

    constructor (readonly getLoandUseCase : GetLoandUseCase){}

    async getLoand(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const idLoan = await this.getLoandUseCase.getLoan(id)
            
            if (idLoan) {
              return res.status(200).json({
                status: "success",
                data: idLoan,
                message: "Lista prestamos por usuario obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron prestamos por usuario",
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