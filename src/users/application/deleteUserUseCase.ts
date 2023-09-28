import { UserRepository } from "../domain/userRepository";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async delete(userId: string): Promise<boolean> {
        try {
            // Assuming deleteUser returns a boolean indicating success
            const userDeleted = await this.userRepository.deleteUser(userId);
            return userDeleted;
        } catch (error) {
            return false;
        }
    }
}
