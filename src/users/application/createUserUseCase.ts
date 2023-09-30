import { validate } from 'class-validator';
import { User } from '../domain/user';
import { UserRepository } from '../domain/userRepository';
import { ValidationCreateUser } from '../domain/validation/validationUser';


export class CreateUserUseCase{
    constructor(readonly userRepository: UserRepository ){}

    async run(
        name:string,
        password:string,
        email:string,
        status:boolean
    ):Promise<User |null >{

        let valitationPost = new ValidationCreateUser(name, email, password, status);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try{
            const createUser = await this.userRepository.createUser(name, password,email,status);
            return createUser;
        }catch(error){
            return  null;
        }
    }
}