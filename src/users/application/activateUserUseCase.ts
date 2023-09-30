import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/user";
import { validate } from 'class-validator';
import { ValidationIdUser } from "../domain/validation/validationUser";

export class ActiveUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async run(id: number): Promise<User | null> {

        let valitationid = new ValidationIdUser(id);
        const validation = await validate(valitationid)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const activeUser = await this.userRepository.activeUser(id);
            return activeUser;
        } catch (error) {
            return null;
        }
    }
}
