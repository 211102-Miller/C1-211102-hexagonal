import { ListRead } from "../domain/listRead";
import { ListReadRepository } from "../domain/listReadRepositoy";

export class CreateUrlUseCase{
    constructor(readonly listReadRepository: ListReadRepository){}

    async create(id: number):Promise<ListRead | null>{
        try {
            //Logica :D
            return null;
        } catch (error) {
            return null;
        }
    }
}