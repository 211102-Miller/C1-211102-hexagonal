import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class DeleterReviewUserUseCase{
    constructor(readonly userRepository:UserRepository){}

    async deleteRevie(id_user:number):Promise<User | null>{

        try {
           const deletes = await this.userRepository.deleteReviewUser(id_user);
           return deletes
        } catch (error) {
            return null;
        }        
    }
}