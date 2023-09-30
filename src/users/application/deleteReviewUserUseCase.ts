import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from "class-validator";
import { ValidationUserIdCamp } from "../domain/validation/validationUser";


export class DeleterReviewUserUseCase{
    constructor(readonly userRepository:UserRepository){}

    async deleteRevie(id_user:number,id_review:string):Promise<boolean>{

        let valitationCamp = new ValidationUserIdCamp(id_user, id_review);
        const validation = await validate(valitationCamp)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
           const deletes = await this.userRepository.deleteReviewUser(id_user,id_review);
           return deletes
        } catch (error) {
            return false;
        }        
    }
}