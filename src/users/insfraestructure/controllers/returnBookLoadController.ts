import { Request, Response } from "express";
import { ReturnBookLoadUseCase } from "../../application/returnBookLoadUseCase";

export class ReturnBookLoadController {
    constructor( readonly returnBookLoadUseCase: ReturnBookLoadUseCase,) {}

    async returnLead(req: Request, res: Response) {
        try {
            const { id_user, id_book } = req.body; // Supongamos que recibes el ID del usuario y el ID del libro desde la solicitud


            const result = await this.returnBookLoadUseCase.bookLead(id_user,id_book)

            if (result === "Libro devuelto exitosamente.") {
                return res.status(200).send({
                    status: "success",
                    data: [],
                    message: result
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    message: result
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
