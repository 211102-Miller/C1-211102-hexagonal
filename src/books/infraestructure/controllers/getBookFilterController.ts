import { Request, Response } from "express";
import { GetBookFilterUseCase } from "../../application/getBookFilterUseCase";

export class GetBookFilterController{
    constructor ( readonly getBookFilterUseCase : GetBookFilterUseCase){}

    async bookFilter(req: Request, res: Response) {
        try {
            let {
                filter,
                title,
                author
            } = req.query;
            const getFilter = await this.getBookFilterUseCase.fliterBook(filter as string, title as string, author as string)
            if (getFilter) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        getFilter
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron resultados."
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error en el servidor."
            });
        }
    }
}