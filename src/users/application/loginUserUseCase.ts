import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';

export class LoginUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async login(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.userRepository.loginUser(email, password);

            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            // Manejo de errores
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    }
}
