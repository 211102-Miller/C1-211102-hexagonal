import { Request,Response } from "express";
import { GetAllStatusUseCase } from "../../application/getAllStatusUseCase";

export class GetAllStatusContoller {
    constructor(readonly getAllStatusUseCase : GetAllStatusUseCase) {}
    async run(res:Response) {
        try {
            let getAllactiveListBooks = await this.getAllStatusUseCase.run()
            if(getAllactiveListBooks){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: getAllactiveListBooks
                    }
                })
            }else{
                return res.status(200).send({
                    status: "succes",
                    message: "List not found or missing"
                });
            }
        } catch (error) {
            return null;
        }

    }
   
}