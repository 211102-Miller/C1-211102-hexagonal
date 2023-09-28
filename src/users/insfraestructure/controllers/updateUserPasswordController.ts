import { Request, Response } from "express";
import { UpdatePasswordUserUseCase } from "../../application/updateUserPasswordUseCase";


export class UpdatePasswordUserController {
    constructor(readonly updatePasswordUserUseCase: UpdatePasswordUserUseCase,) {}

   async updatePassword(req:Request, res:Response) {
    try {
        let {
            id,
            password,
        } = req.body
    
        let updatePasswordUser = await this.updatePasswordUserUseCase.updatePassword(id,password);

        if(updatePasswordUser){
            return res.status(200).send({
                status:"succes",
                data:{
                    update_user: updatePasswordUser
                }
            })
        }
    } catch (error) {   
    }
}
}