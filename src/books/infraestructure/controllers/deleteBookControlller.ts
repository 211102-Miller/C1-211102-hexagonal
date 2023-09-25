import { Request, Response } from "express";
import { DeleteBookUseCase } from "../../application/deleteBookUseCase";

export class DeleteBookController {
  constructor(readonly deleteBookUseCase: DeleteBookUseCase) {}

  async deleteBook(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(400).send({
          status: "error",
          data: [],
          validations: [],
          message: "El campo 'id' es requerido en la solicitud.",
        });
      }

      const deleted = await this.deleteBookUseCase.deleteBook(id);

      if (deleted) {
        return res.status(200).send({
          status: "success",
          data: {},
          message: "El libro se ha eliminado exitosamente",
        });
      } else {
        return res.status(404).send({
          status: "error",
          data: [],
          message: "No se encontró un libro con el ID especificado",
        });
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      return res.status(500).send({
        status: "error",
        data: [],
        message: "Ocurrió un error interno al eliminar el libro.",
      });
    }
  }
}
