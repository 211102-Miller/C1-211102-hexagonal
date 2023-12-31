import { Request, Response } from "express";
import { GetFilterReviewUserUseCase } from "../../application/getFilterReviewUserUseCase";

export class GetFilterReviewUserController {
  constructor(private readonly getFilterReviewUserUseCase: GetFilterReviewUserUseCase) {}

  async getFilterReviewUser(req: Request, res: Response) {
    try {
      const { id_User } = req.params;

      if (!id_User) {
        return res.status(400).json({
          status: "error",
          data: [],
          message: "El campo 'id_User' es requerido en la solicitud.",
        });
      }

      const reviews = await this.getFilterReviewUserUseCase.getFilterReviewUser(Number(id_User));

      if (reviews) {
        return res.status(200).json({
          status: "success",
          data: reviews,
          message: "Lista de reseñas del usuario obtenida exitosamente",
        });
      } else {
        return res.status(404).json({
          status: "error",
          data: [],
          message: "No se encontraron reseñas para el usuario especificado",
        });
      }
    } catch (error) {
      console.error("Error al obtener las reseñas del usuario:", error);
      return res.status(500).json({
        status: "error",
        data: [],
        message: "Ocurrió un error interno al obtener las reseñas del usuario.",
      });
    }
  }
}