
import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';


export class UpdatePasswordUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async updatePassword(id: number, newPassword: string): Promise<User | null> {
            try {
                const updatePUserById = await this.userRepository.updateUserPassword(id, newPassword)
                return updatePUserById;
            } catch (error) {
                return null;
            }

        }
}