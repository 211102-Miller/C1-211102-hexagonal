import { Request, Response } from "express";
import { SingOffUserUseCase } from "../../application/signOffUserUseCase";

export class SingOffUserController {
    constructor(readonly singOffUserUseCase : SingOffUserUseCase) {}
    async singOff(req:Request, res:Response) {
        try {
            let {id} = req.body
        
            let off = await this.singOffUserUseCase.SingOff(id)

            if(off){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        off
                    }
                })
            }
            else{
                return res.status(404).send({
                    status: "error",
                    message: "No se encontro el usuario"
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

