import { User } from "../domain/user";
import { UserRepository } from '../domain/userRepository';

export class UpdateUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async updateUser(
    id: number,
    newUser?: { name?: string; password?: string; email?: string; status?: string }
  ): Promise<User | null> {
    try {
      const updateUser = await this.userRepository.updateUser(id, newUser);
      return updateUser;
    } catch (error) {
      return null;
    }
  }
}
