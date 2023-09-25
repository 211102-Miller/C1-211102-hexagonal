import { Request, Response } from "express";
import { GetBookFilterUseCase } from "../../application/getBookFilterUseCase";

export class GetBookFilterController{
    constructor ( readonly getBookFilterUseCase : GetBookFilterUseCase){}

    async bookFilter(req:Request, res: Response){
        try {
            let {
                filter,
                title,
                author
            } = req.query;
            const getFilter = await this.getBookFilterUseCase.fliterBook(filter as string,title as string, author as string)
            if(getFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getFilter
                    }
                })
            }
        } catch (error) {
            
        }
    }
}