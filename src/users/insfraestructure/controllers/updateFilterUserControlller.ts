import { Request, Response } from "express";
import { GetFilterUserUseCase } from "../../application/getFilterUserUseCase";

  export class GetFilterUserController {
    constructor(readonly getFilterUserUseCase: GetFilterUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {filter,name,email,} = req.query

            let getUserByFilter = await this.getFilterUserUseCase.run(filter as string, name as string, email as string)

            if (getUserByFilter) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        getUserByFilter
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron resultados."
                });
            }
        } catch (error) {   
        }
    }
}
