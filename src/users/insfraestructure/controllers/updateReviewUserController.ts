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
      console.error("Error al actualizar la reseña:", error);
      return res.status(500).json({
        status: "error",
        message: "Error interno al actualizar la reseña."
      });
    }
  }
}
