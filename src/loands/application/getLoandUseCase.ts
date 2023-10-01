import { Loand } from "../domain/loands";
import { LoandRepository } from "../domain/loandsRepository";
import { validate } from "class-validator";
import { ValidationLoandID } from "../domain/validation/validationLoands";

export class GetLoandUseCase {
    constructor(readonly loandRepository: LoandRepository) { }

    async getLoan(id: number): Promise<Loand | null> {

        let valitationId = new ValidationLoandID(id);
        const validation = await validate(valitationId)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const loanId = await this.loandRepository.getLoand(id);
            return loanId;
        } catch (error) {
            return null;
        }
    }
}