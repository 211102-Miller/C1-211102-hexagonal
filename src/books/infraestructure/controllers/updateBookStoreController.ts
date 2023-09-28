import { Request, Response } from "express";
import { UpdateBookStoreUseCase } from "../../application/updateBookStoreUseCase";

export class UpdateBookStoreController {
  constructor(private readonly updateBookStoreUseCase: UpdateBookStoreUseCase) {}

  async updateBookStore(req: Request, res: Response) {
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

      const updateStore = await this.updateBookStoreUseCase.updateStore(Number(id))
      if (updateStore) {
        res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', book: updateStore });
      } else {
        res.status(404).json({ success: false, message: 'La revisión con el ID especificado no fue encontrada.' });
      }
      
    } catch (error) {
      console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
      return null;
    }
  }
}
