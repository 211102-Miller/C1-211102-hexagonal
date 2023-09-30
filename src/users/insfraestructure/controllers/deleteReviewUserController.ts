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
