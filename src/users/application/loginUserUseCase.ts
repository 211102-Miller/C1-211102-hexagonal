import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';
import { validate } from 'class-validator';
import { ValidationLogin } from "../domain/validation/validationUser";

export class LoginUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async login(email: string, password: string): Promise<User | null> {

        let valitationids = new ValidationLogin(email,password);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }
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
