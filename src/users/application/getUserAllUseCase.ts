import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';


export class GetUserAllUseCase{
    constructor(readonly userRepository: UserRepository ){}

    async getAllUsers(): Promise<User[]> {

        try {
          const users = await this.userRepository.getAllUsers();
          return users || [];
          
        } catch (error) {
            return []
        }
      }
      
}