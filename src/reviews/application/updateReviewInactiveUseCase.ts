import { Review } from '../domain/review';
import { ReviewRepository } from '../domain/reviewRepository';

export class UpdateReviewInactiveUseCase {
  constructor(readonly reviewRepository: ReviewRepository) {}

  async execute(id: number): Promise<{ review: Review | null; message?: string }> {
    // Obtener la revisión actual del repositorio
    const existingReview = await this.reviewRepository.getReview(id);

    if (!existingReview) {
      return { review: null }; // No se encontró una revisión con el ID especificado
    }

    // Comprobar si existingReview es un arreglo de revisiones
    if (Array.isArray(existingReview)) {
      return { review: null }; // No se puede manejar un arreglo de revisiones en este caso
    }

    // Verificar si el "status" ya está en false
    if (!existingReview.status) {
      return { review: existingReview, message: 'El campo "status" ya estaba en false.' };
    }

    // Actualizar el "status" a false solo si no estaba en false antes
    const updatedReview = await this.reviewRepository.updateReviweInactive(id);

    if (!updatedReview) {
      return { review: null }; // Error al actualizar la revisión
    }

    return { review: updatedReview };
  }
}
