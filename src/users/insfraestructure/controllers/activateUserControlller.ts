
import { Request, Response } from "express";
import { ActiveUserUseCase } from "../../application/activateUserUseCase";


export class ActiveUserController {
    constructor(readonly activeUserUseCase : ActiveUserUseCase) {}

    async run(req:Request, res:Response) {
        try {
            let {id,} = req.params
        
            let activeUser = await this.activeUserUseCase.run(Number(id))

            if(activeUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activeUser
                    }
                })
            }
            if (!activeUser) {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontro el ID del Usuario"
                });
            }
        } catch (error) {   
            if (error instanceof Error) {

                if (error.message.startsWith('[')) {
                  
                  return res.status(400).send({
                    status: "error",
                    message: "Validation failed",
                    errors: JSON.parse(error.message)
                  });
                }
              }
              return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
              });
        }
    }
}


