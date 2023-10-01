import { Response,Request } from "express";
<<<<<<< HEAD:src/users/insfraestructure/controllers/getUserController.ts
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
=======
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
>>>>>>> feature-loands:src/loands/infraestructure/controllers/getLoandController.ts
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
<<<<<<< HEAD:src/users/insfraestructure/controllers/getUserController.ts
                message: "No se encontraron libros por usuario",
=======
                message: "No se encontraron prestamos por usuario",
>>>>>>> feature-loands:src/loands/infraestructure/controllers/getLoandController.ts
              });
            }
          } catch (error) {
            if (error instanceof Error) {
<<<<<<< HEAD:src/users/insfraestructure/controllers/getUserController.ts

=======
      
>>>>>>> feature-loands:src/loands/infraestructure/controllers/getLoandController.ts
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
<<<<<<< HEAD:src/users/insfraestructure/controllers/getUserController.ts
          }
}
=======
    }
}
>>>>>>> feature-loands:src/loands/infraestructure/controllers/getLoandController.ts
