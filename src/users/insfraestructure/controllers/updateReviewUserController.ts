import { Request, Response } from "express";
import { UpdateReviewUserUseCase } from "../../application/updateReviewUserUseCase";

export class UpdateReviewUserController {
  constructor( readonly updateReviewUserUseCase: UpdateReviewUserUseCase) {}

  async updateReview(req: Request, res: Response) {
    try {
      const { id_user, id_book, updated_Review } = req.body;

      const result = await this.updateReviewUserUseCase.updateReview(id_user,id_book,updated_Review);

      if (result) {
        return res.status(200).json({
          status: "success",
          message: "Reseña actualizada correctamente."
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "No se pudo actualizar la reseña. Asegúrate de que la reseña existe y pertenece al usuario y libro indicados."
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
