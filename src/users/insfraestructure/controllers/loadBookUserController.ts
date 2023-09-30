import { Request,Response } from "express";
import { LoadBookUserUseCase } from "../../application/loadBookUserUseCase";


export class LoadBookUserController{
    constructor ( readonly loadBookUserUseCase: LoadBookUserUseCase){}

    async loadBook(req:Request, res:Response){
        try {
            const {id_user, id_book} = req.body;

            const load = await this.loadBookUserUseCase.loadBook(id_user, id_book);

            if (load === "Libro prestado exitosamente.") {
                return res.status(201).send({
                    status: "success",
                    data: load,
                    message: load
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    message: load
                });
            }

        } catch (error) {
            console.error('Error al prestar el libro:', error);
            return res.status(500).send({
                status: "error",
                data: [],
                message: "Error interno al prestar el libro."
            });
        }
    }
}