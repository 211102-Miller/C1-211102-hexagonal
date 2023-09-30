import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';
import { validate } from "class-validator";
import { updateUserValidation } from "../domain/validation/validationUser";

export class UpdateUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async updateUser(
    id: number,
    newUser?: { name?: string; password?: string; email?: string; status?: string}
  ): Promise<User | null> {

    let valitationUpdate = new updateUserValidation(newUser?.name, newUser?.email, newUser?.password, newUser?.status);
    const validation = await validate(valitationUpdate)
    if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
    }

    try {
      const updateUser = await this.userRepository.updateUser(id, newUser);
      return updateUser;
    } catch (error) {
      return null;
    }
  }
}
