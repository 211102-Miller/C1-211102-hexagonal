import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";


export class LoadBookUserUseCase{
    constructor(readonly userRepository: UserRepository){}

    async loadBook(id_user:number, id_book:number):Promise<string| null>{
        try {
            const load = await this.userRepository.loadBookUser(id_user, id_book);
            return load;
        } catch (error) {
            console.error("Error al prestar el libro:", error);
            return null;
        }
    }
}