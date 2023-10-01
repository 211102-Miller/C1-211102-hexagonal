import { Request, Response } from 'express';
import { UpdateReviewInactiveUseCase } from '../../application/updateReviewInactiveUseCase';

export class UpdateReviewInactiveController {
  constructor(readonly updateReviewInactiveUseCase: UpdateReviewInactiveUseCase) {}

  async updateReviewInactive(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Llamar al caso de uso para actualizar el valor "status"
      const updatedReview = await this.updateReviewInactiveUseCase.execute(Number(id));

      if (updatedReview) {
        res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', review: updatedReview });
      } else {
        res.status(404).json({ success: false, message: 'La revisión con el ID especificado no fue encontrada.' });
      }
    } catch (error) {
        return null;   
    }
  }
}
