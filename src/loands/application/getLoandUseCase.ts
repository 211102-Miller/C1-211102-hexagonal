import { Loand } from "../domain/loands";
import { LoandRepository } from "../domain/loandsRepository";


export class GetLoandUseCase{
    constructor (readonly loandRepository: LoandRepository ){}

    async getLoan(id:number):Promise<Loand|null>{

        try {
            const loanId = await this.loandRepository.getLoand(id);
            return loanId;
          } catch (error) {
            return null;
          }
    }
}