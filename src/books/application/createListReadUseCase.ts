import { ListRead } from "../domain/listRead";
import { ListReadRepository } from "../domain/listReadRepositoy";


export class CreateListReadUserCase{
    constructor(readonly listReadRepository: ListReadRepository){}

    async create(
        id_user: number,
        list_title:string,
        descriptions:string,
        
        status:boolean
    ):Promise<ListRead | null>{
        try {
            const createRead = await this.listReadRepository.createRead(id_user,list_title,descriptions,status);
            return createRead;
        } catch (error) {
            return null
        }
    }

}