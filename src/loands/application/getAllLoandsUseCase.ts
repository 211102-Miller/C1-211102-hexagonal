import { Loand } from "../domain/loands";
import { LoandRepository } from "../domain/loandsRepository";


export class GetAllLoandsUseCase{
    constructor(readonly loandRepository: LoandRepository ){}

    
    async getAllLoand(): Promise<Loand[] | null> {
        try {
          const loan = await this.loandRepository.getAllLoans();
          return loan || [];
        } catch (error) {
            return null
        }
      }
      
}

