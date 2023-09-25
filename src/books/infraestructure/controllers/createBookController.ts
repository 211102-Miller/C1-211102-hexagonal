import { Response, Request } from "express";
import { CreateBookUserCase } from "../../application/createBookUseCase";

export class CreateBookController{
    constructor(readonly createBookUserCase: CreateBookUserCase){}

    async create(req:Request, res:Response){
        try {
            let{title,author,img_url,status,is_loaded} = req.body;

            // Verificar si algún campo requerido está vacío o nulo
            if (!title || !author || !img_url || status === undefined || is_loaded === undefined) {
                return res.status(400).send({
                status: "error",
                data: [],
                validations: [],
                message: "Todos los campos son obligatorios y no pueden estar vacíos o nulos.",
                });
            }

            const createBook = await this.createBookUserCase.create(
                title,
                author,
                img_url,
                status,
                is_loaded,
            )
            if (createBook) {
                return res.status(201).send({
                  status: "success",
                  data: {
                    id: createBook.id,
                    title: createBook.title,
                    author: createBook.author,
                    img_url: createBook.img_url,
                    status: createBook.status,
                    is_loaded: createBook.is_loaded,
                  },
                  message: "El prospecto ha sido creado exitosamente",
                });
              } else {
                res.status(400).send({
                  status: "error",
                  data: [],
                  validations: [],
                  message: "Error al crear un cliente prospecto, inténtalo más tarde",
                });
            }

        } catch (error) {
            return null;
        }
    }
}

