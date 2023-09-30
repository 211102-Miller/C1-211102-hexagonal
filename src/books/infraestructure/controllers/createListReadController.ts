import { Request,Response } from "express-serve-static-core";
import { CreateListReadUserCase } from "../../application/createListReadUseCase";


export class CreateListReadController{
    constructor(readonly createListReadUserCase: CreateListReadUserCase){}

    async createListRead(req:Request, res:Response){
        try {
            let{id_user,list_title,descriptions,status} = req.body;

            const create = await this.createListReadUserCase.create(id_user,list_title,descriptions,status);

            if(create){
                return res.status(201).send({
                    status: "success",
                    data: {
                        id_user: create.id_user,
                        list_title: create.list_title,
                        descriptions: create.descriptions,
                        status: create.status,
                    },
                    message: "El prospecto ha sido creado exitosamente",
                  });
            }else {
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