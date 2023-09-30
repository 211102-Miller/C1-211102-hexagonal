import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class DeleterReviewUserUseCase{
    constructor(readonly userRepository:UserRepository){}

    async deleteRevie(id_user:number,id_review:string):Promise<boolean>{

        try {
           const deletes = await this.userRepository.deleteReviewUser(id_user,id_review);
           return deletes
        } catch (error) {
            return false;
        }        
    }
}