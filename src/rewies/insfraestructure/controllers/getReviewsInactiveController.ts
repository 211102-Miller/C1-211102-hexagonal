import { Request,Response } from "express";
import { GetReviewsInactiveUseCase } from "../../application/getReviewsInactiveUseCase";


export class GetReviewsInactiveController{
    constructor (readonly getReviewsInactiveUseCase : GetReviewsInactiveUseCase){}

    async reviewInactive(req:Request,res:Response){
        try {
            const status = false;
            const inactiveRerviews = await this.getReviewsInactiveUseCase.reviewsInactive(status)

            if(inactiveRerviews){
                return res.status(200).json({
                    status: "success",
                    data: inactiveRerviews,
                    message: "Lista de libros inactivos obtenida exitosamente",
                });
            }else {
                return res.status(404).json({
                  status: "error",
                  data: [],
                  message: "No se encontraron reseñas inactivos",
                });
            }

        } catch (error) {
            return null
        }
    }
}