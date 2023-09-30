import { ListRead } from "../domain/listRead";
import { ListReadRepository } from "../domain/listReadRepositoy";

export class GetAllStatusUseCase {
    constructor(readonly listReadRepository: ListReadRepository) {}
    
    async run(
    ): Promise<ListRead[] | null> {
        
        try {
            const listAllactiveBooks = await this.listReadRepository.getAllStatus()
            return listAllactiveBooks;
        } catch (error) {
            return null;
        }
    }
}