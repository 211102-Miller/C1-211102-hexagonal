import { GetReviewUseCase } from "../../application/getReviewUseCase";
import { Request, Response } from "express";

export class GetReviewController{
    constructor ( readonly getReviewUseCase: GetReviewUseCase){}

    async getReview(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const review = await this.getReviewUseCase.getReview(id);
            if (review) {
                return res.status(200).json({
                  status: "success",
                  data: review,
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
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de libros por usuario",
              });
        }
    }
}