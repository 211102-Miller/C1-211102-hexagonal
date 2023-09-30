import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from 'class-validator';
import { ValidationUserBookId } from "../domain/validation/validationUser";

export class LoadBookUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async loadBook(id_user: number, id_book: number): Promise<string | null> {

        let valitationids = new ValidationUserBookId(id_user,id_book);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const load = await this.userRepository.loadBookUser(id_user, id_book);
            return load;
        } catch (error) {
            console.error("Error al prestar el libro:", error);
            return null;
        }
    }
}