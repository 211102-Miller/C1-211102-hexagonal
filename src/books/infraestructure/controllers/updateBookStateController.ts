import { Response, Request } from "express";
import { UpdateStatusUseCase } from "../../application/updateBookStatusUseCase";


export class UpdateStatusController {
    constructor(readonly updateStatusUseCase: UpdateStatusUseCase) {}
  
    async updateStatus(req: Request, res: Response) {
      try {
        const {id} = req.params;
  
  
        // Llama al caso de uso para actualizar el estado del libro
        const updatedBook = await this.updateStatusUseCase.updateStatus(Number(id));
        if (updatedBook) {
          res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', book: updatedBook });
        } else {
          res.status(404).json({ success: false, message: 'La revisión con el ID especificado no fue encontrada.' });
        }
        
      } catch (error) {
        console.error("Error al actualizar el estado del libro:", error);
        return null
      }
    }
  }