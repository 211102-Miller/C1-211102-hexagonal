import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetFilterUserUseCase {
    constructor(readonly userRepository: UserRepository) {}
    
    async run(filter: string,  email?:string, name?:string): Promise<User| User[] |null> {
        try {
            const list = await this.userRepository.filterUser(filter,email, name);
            return list;
        } catch (error) {
            return null;
        }
    }
}
