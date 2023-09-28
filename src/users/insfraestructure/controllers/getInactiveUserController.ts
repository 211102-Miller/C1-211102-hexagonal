import { Request, Response } from "express";
import { GetInactiveUserUseCase } from "../../application/getInactiveUserUseCase";

export class GetInactiveUserController {
    constructor(readonly getInactiveUserUseCase: GetInactiveUserUseCase,) {}
   
   async run(req:Request, res:Response) {

        try {
            let userInactives = await this.getInactiveUserUseCase.run()

            if(userInactives){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        userInactives
                    }
                })
            }
        } 
        catch (error) {  
            return null; 
        }
    }
}