import { Request,Response } from "express-serve-static-core";
import { DeleterReviewUserUseCase } from "../../application/deleteReviewUserUseCase";


export class DeleteReviewUserController {
  constructor(readonly deleterReviewUserUseCase: DeleterReviewUserUseCase) {}

  async deleteReview(req: Request, res: Response) {
      try {
          const id_user = Number(req.params.id_user);
          const id_review = req.params.id_review;
          const deleted = await this.deleterReviewUserUseCase.deleteRevie(id_user, id_review);

          if (deleted) {
              return res.status(200).send({
                  status: "success",
                  data: deleted,
                  message: "La reseña se ha eliminado exitosamente",
              });
          }

          return res.status(404).send({
              status: "error",
              data: [],
              message: "No se encontró una reseña con los IDs especificados",
          });
      } catch (error) {
          console.error("Error en el controlador de eliminación de reseñas:", error);
          return res.status(500).send({
              status: "error",
              data: [],
              message: "Ocurrió un error interno al eliminar la reseña",
          });
      }
  }
}
