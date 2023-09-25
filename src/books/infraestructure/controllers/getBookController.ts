import { GetBookUseCasa } from "../../application/getBookUseCase";
import { Response,Request } from "express";

export class GetBookController{

    constructor (readonly getBookUseCase : GetBookUseCasa){}

    async getBook(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const books = await this.getBookUseCase.getBook(id);
            
            if (books) {
              return res.status(200).json({
                status: "success",
                data: books,
                message: "Lista de libros por usuario obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron libros por usuario",
              });
            }
          } catch (error) {
            return res.status(500).json({
              status: "error",
              data: [],
              message: "Error al obtener la lista de libros por usuario",
            });
          }
    }
}