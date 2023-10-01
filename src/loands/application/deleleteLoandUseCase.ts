import { LoandRepository } from "../domain/loandsRepository";


export class DeleteLoanUseCase {
    constructor( readonly loandRepository: LoandRepository) {}

    async delete(id: string): Promise<boolean> {
        try {
            // Assuming deleteUser returns a boolean indicating success
            const loanDelete = await this.loandRepository.deleteLoands(id)
            return loanDelete;
        } catch (error) {
            return false;
        }
    }
}