import { CreateUserUseCase } from "../../application/createUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {
    constructor( readonly createUserUseCase: CreateUserUseCase) {}

    async addUser(req: Request, res: Response) {
        try {
            let { name, password, email, status } = req.body;

            // Validar que se proporcionen todos los campos requeridos
            if (!name || !password || !email || status === undefined) {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Todos los campos son obligatorios y no pueden estar vacíos o nulos.",
                });
            }

            // Puedes agregar más validaciones según tus requerimientos

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

        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                data: [],
                validations: [],
                message: "Error interno del servidor",
            });
        }
    }
}