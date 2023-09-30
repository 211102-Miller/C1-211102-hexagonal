import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';
import { validate } from "class-validator";
import { ValidationUserIdCamp } from "../domain/validation/validationUser";


export class UpdatePasswordUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async updatePassword(id: number, newPassword: string): Promise<User | null> {

        let valitationCamp = new ValidationUserIdCamp(id, newPassword);
        const validation = await validate(valitationCamp)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const updatePUserById = await this.userRepository.updateUserPassword(id, newPassword)
            return updatePUserById;
        } catch (error) {
            return null;
        }

    }
}