import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";


export class SingOffUserUseCase {
    constructor( readonly userRepository: UserRepository) {}

    async SingOff(id: number): Promise<User | null> {
        try {
            const sign = await this.userRepository.signoffUser(id);
            return sign;
        } catch (error) {
            return null;
        }
    }
}