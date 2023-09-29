import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetInactiveUserUseCase {
    constructor( readonly userRepository: UserRepository) {}
    
    
    async run(): Promise<User[] | User | null> {
        try {
            const listInactive = await this.userRepository.getInactiveUser();
            return listInactive;
        } catch (error) {
            return null;
        }
    }
}