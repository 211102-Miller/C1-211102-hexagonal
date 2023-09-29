import { Request, Response } from "express";
import { UpdatePasswordUserUseCase } from "../../application/updateUserPasswordUseCase";

export class UpdateUserPasswordController {
    constructor( readonly updatePasswordUserUseCase: UpdatePasswordUserUseCase) {}

   async updatePassword(req:Request, res:Response) {
    try {

        let {id,password} = req.body
    
        let updatePasswordUser = await this.updatePasswordUserUseCase.updatePassword(id,password);

        if(updatePasswordUser){
            return res.status(200).send({
                status:"succes",
                data:{
                    update_user: updatePasswordUser
                }
            })
        }else {
            return res.status(404).json({
                status: "error",
                message: `No se encontró un usuario con el ID ${id}`}
        )};
        
    } catch (error) {   
        return null
    }
}
}