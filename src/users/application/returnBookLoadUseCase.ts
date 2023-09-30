import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';

export class ReturnBookLoadUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async bookLead(id_user: number, id_book: number): Promise<string | null> {
        try {
            // Lógica para devolver un libro al usuario
            const prestamoMessage = await this.userRepository.returnBookLoad(id_user, id_book);
            return prestamoMessage;
        } catch (error) {
            console.error("Error al devolver el libro:", error);
            return null;
        }
    }
}
