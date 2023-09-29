import { Request, Response } from "express";
import { UpdateFilterUserUseCase } from "../../application/updateFilterUserUseCase";

  export class UpdateFilterUserController {
    constructor(readonly updateFilterUserUseCase: UpdateFilterUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                filter,
                name,
                email,
            } = req.query
            let getUserByFilter = await this.updateFilterUserUseCase.run(filter as string, email as string, name as string)

            if(getUserByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getUserByFilter
                    }
                })
            }
        } catch (error) {   
        }
    }
}
