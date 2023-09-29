import { User } from '../domain/user';
import { UserRepository } from '../domain/userRepository';


export class CreateUserUseCase{
    constructor(readonly userRepository: UserRepository ){}

    async run(
        name:String,
        password:String,
        email:String,
        status:boolean
    ):Promise<User |null >{
        try{
            const createUser = await this.userRepository.createUser(name, password,email,status);
            return createUser;
        }catch(error){
            return  null;
        }
    }
}