import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/user";

export class ActiveUserUseCase {
    constructor( readonly userRepository: UserRepository) {}

    async run(id: number): Promise<User | null> {
        try {
            const activeUser = await this.userRepository.activeUser(id);
            return activeUser;
        } catch (error) {
            return null;
        }
    }
}
