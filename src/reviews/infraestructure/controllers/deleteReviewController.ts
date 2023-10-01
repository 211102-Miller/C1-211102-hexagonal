import { Request, Response } from "express";
import { DeleteReviewUseCase } from "../../application/deleteReviewUseCase";

export class DeleteReviewController {
  constructor(readonly deleteReviewUseCase: DeleteReviewUseCase) {}

  async deleteReview(req: Request, res: Response) {
    try {
      const { id, id_User } = req.params;

      if (!id || !id_User) {
        return res.status(400).send({
          status: "error",
          data: [],
          validations: [],
          message: "Los campos 'id' e 'id_user' son requeridos en la solicitud.",
        });
      }

      const deleted = await this.deleteReviewUseCase.deleteReview(Number(id), Number(id_User));

      if (deleted) {
        return res.status(200).send({
          status: "success",
          data: deleted,
          message: "La reseña se ha eliminado exitosamente",
        });
      } else {
        return res.status(404).send({
          status: "error",
          data: [],
          message: "No se encontró una reseña con los ID especificados",
        });
      }
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
      return res.status(500).send({
        status: "error",
        data: [],
        message: "Ocurrió un error interno al eliminar la reseña.",
      });
    }
  }
}
