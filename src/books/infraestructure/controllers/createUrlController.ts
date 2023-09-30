import { Request,Response } from "express";
import { CreateUrlUseCase } from "../../application/createUrlUseCase";


export class CreateUrlUseController{
    constructor(readonly createUrlUseCase:CreateUrlUseCase){}

    async create(req:Request, res:Response){
        try {
            //Logicaaaaaaa
        } catch (error) {
            return null;
        }
    }

}