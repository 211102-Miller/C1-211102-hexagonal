import { Request,Response } from "express";
import { UpdateReviewUserUseCase } from "../../application/updateReviweUserUseCase";

export class UpdateReviewUserController{
    constructor(readonly updateReviewUserUseCase:UpdateReviewUserUseCase){}

    async updateReview(req:Request, res:Response){
        try {
            const {id,id_User,review_text} = req.body;

            // Verifica si bookId y newStatus están presentes en la solicitud
            if (!id || !id_User || !review_text) {
                return res.status(400).send({
                status: "error",
                data: [],
                validations: [],
                message: "bookId y newStatus son campos requeridos en la solicitud.",
                });
            }
            const updateReviweUse = await this.updateReviewUserUseCase.updateReview(id,id_User,review_text);
            if (updateReviweUse) {
                return res.status(200).send({
                  status: "success",
                  data: {
                    id: updateReviweUse.id,
                    id_User: updateReviweUse.id_user,
                    id_Book: updateReviweUse.id_book,
                    review_text: updateReviweUse.review_text,
                    status: updateReviweUse.status,
                  },
                  message: "El estado del libro se ha actualizado exitosamente",
                });
              } else {
                res.status(400).send({
                  status: "error",
                  data: [],
                  validations: [],
                  message: "Error al actualizar el estado del libro, el libro no existe o ocurrió un error.",
                });
              }
        } catch (error) {
            return null
        }
    }
}