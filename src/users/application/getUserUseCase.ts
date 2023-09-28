import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";


export class GetUserUseCase{
    constructor (readonly userRepository: UserRepository ){}

    async getUserId(id:number):Promise<User|null>{
        try {
            const userId = await this.userRepository.getUser(id);
            return userId;
          } catch (error) {
            return null;
          }
    }
}