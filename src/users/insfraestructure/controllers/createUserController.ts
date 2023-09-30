import { CreateUserUseCase } from "../../application/createUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {
    constructor( readonly createUserUseCase: CreateUserUseCase) {}

    async addUser(req: Request, res: Response) {
        try {
            let { name, password, email, status } = req.body;


            // Crear el usuario si todas las validaciones son exitosas
            let createUser = await this.createUserUseCase.run(name, password, email, status);

            if (createUser) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: createUser.id,
                        name: createUser.name,
                        password: createUser.password,
                        email: createUser.email,
                        status: createUser.status,
                    },
                    message: "Usuario creado exitosamente.",
                });
            }

            res.status(400).send({
                status: "error",
                data: [],
                validations: [],
                message: "Error al crear el usuario.",
            });

        }catch (error) {
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
