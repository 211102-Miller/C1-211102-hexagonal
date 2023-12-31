import { Request, Response } from "express";
import { WriteReviewUserUseCase } from "../../application/writeReviewUserUseCase";

export class WriteReviewUserController {
  constructor(private readonly writeReviewUserUseCase: WriteReviewUserUseCase) {}

  async writeReview(req: Request, res: Response) {
    try {
      const { id_user, id_book, review_Text } = req.body;  // Assuming userId, bookId, and reviewText are sent in the request body

      // Escribir la reseña
      const success = await this.writeReviewUserUseCase.write(id_user, id_book, review_Text);

      if (success) {
        return res.status(201).send({
          status: "success",
          data: success,
          message: "Se guardo la Reseña correctamente."
        });
      }

      res.status(400).send({
        status: "error",
        data: [],
        message: "Error al escribir la reseña. Asegúrate de que el usuario ha prestado y devuelto el libro."
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
