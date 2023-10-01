import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async delete(userId: string): Promise<boolean> {

    
        try {
            // Assuming deleteUser returns a boolean indicating success
        const  UserDelete = await this.userRepository.deleteUser(userId);
        return UserDelete;
        } catch (error) {
            return false;
        }
        


    }
}
