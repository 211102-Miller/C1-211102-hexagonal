import { Request, Response } from "express";
import { UpdateBookLeadUseCase } from "../../application/updateBookLeadUseCase";

export class UpdateBookLeadController {
  constructor(private readonly updateBookLeadUseCase: UpdateBookLeadUseCase) {}

  async updateBookLead(req: Request, res: Response) {
    try {
      const { id} = req.params;

      // Verifica si id y is_loaded están presentes en la solicitud
      if (!id) {
        return res.status(400).send({
          status: "error",
          data: [],
          validations: [],
          message: "id y is_loaded son campos requeridos en la solicitud.",
        });
      }

      const updateBookLead = await this.updateBookLeadUseCase.updateLoad(Number(id))
      if (updateBookLead) {
        res.status(200).json({ success: false, message: 'Valor "status" actualizado a false.', book: updateBookLead });
      } else {
        res.status(404).json({ success: true, message: 'La revisión con el ID especificado no fue encontrada.' });
      }
      
    } catch (error) {
      console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
      return null;
    }
  }
}
