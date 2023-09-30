import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/loginUserUseCase";

export class LoginUserController {
    constructor( readonly loginUserUseCase: LoginUserUseCase,) {}

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this.loginUserUseCase.login(email, password);

            if (user) {
                return res.status(200).json({
                    status: "success",
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: user.status,
                    },
                    message: "Inicio de sesión exitoso.",
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Credenciales inválidas. Verifica tu email y contraseña.",
                });
            }
        } catch (error) {
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
