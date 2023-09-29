import { Request,Response } from "express-serve-static-core";
import { DeleterReviewUserUseCase } from "../../application/deleteReviewUserUseCase";


export class DeleteReviewUserController{
    constructor(readonly deleterReviewUserUseCase: DeleterReviewUserUseCase){}

    async deleteReview(req:Request, res:Response){
        try {
            const id = Number(req.params.id_user);
            const deleted = await this.deleterReviewUserUseCase.deleteRevie(id);

            if (deleted !== null) { // Verifica explícitamente si deleted no es null
                return res.status(200).send({
                  status: "success",
                  data: {},
                  message: "El libro se ha eliminado exitosamente",
                });
              } else {
                return res.status(404).send({
                  status: "error",
                  data: [],
                  message: "No se encontró un libro con el ID especificado",
                });
            }
            
        } catch (error) {
            return null;
        }
    }
}