import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { validate } from 'class-validator';
import { ValidationIdUser } from "../domain/validation/validationUser";

export class GetUserUseCase {
  constructor(readonly userRepository: UserRepository) { }

  async getUserId(id: number): Promise<User | null> {

    let valitationid = new ValidationIdUser(id);
    const validation = await validate(valitationid)
    if (validation.length > 0) {
      throw new Error(JSON.stringify(validation));
    }
    
    try {
      const userId = await this.userRepository.getUser(id);
      return userId;
    } catch (error) {
      return null;
    }
  }
}