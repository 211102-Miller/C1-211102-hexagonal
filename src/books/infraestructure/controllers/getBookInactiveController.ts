import { GetBookInactiveUseCase } from "../../application/getBookInactiveUseCase";
import { Response, Request } from "express";

export class GetBookInactiveController {
  constructor(readonly getBookInactiveUseCase: GetBookInactiveUseCase) {}

  async getBookInactive(req: Request, res: Response) {
    try {
      const status = false; 
      const inactiveBooks = await this.getBookInactiveUseCase.getInactive(status);

      if (inactiveBooks) {
        return res.status(200).json({
          status: "success",
          data: inactiveBooks,
          message: "Lista de libros inactivos obtenida exitosamente",
        });
      } else {
        return res.status(404).json({
          status: "error",
          data: [],
          message: "No se encontraron libros inactivos",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        data: [],
        message: "Error al obtener la lista de libros inactivos",
      });
    }
  }
}
