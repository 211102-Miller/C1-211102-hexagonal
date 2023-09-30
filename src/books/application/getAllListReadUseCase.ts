import { ListRead } from "../domain/listRead";
import { ListReadRepository } from "../domain/listReadRepositoy";


export class GetAllListReadUseCase{
    constructor(readonly listReadRepository: ListReadRepository){}

    async getAll():Promise<ListRead[] |null>{
        try {
            const lead = await this.listReadRepository.getAll();
            return lead;
        } catch (error) {
            return null;
        }
    }
}