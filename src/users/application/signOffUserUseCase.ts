import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from 'class-validator';
import { ValidationIdUser } from "../domain/validation/validationUser";


export class SingOffUserUseCase {
    constructor( readonly userRepository: UserRepository) {}

    async SingOff(id: number): Promise<User | null> {

        let valitationid = new ValidationIdUser(id);
        const validation = await validate(valitationid)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const sign = await this.userRepository.signoffUser(id);
            return sign;
        } catch (error) {
            return null;
        }
    }
}