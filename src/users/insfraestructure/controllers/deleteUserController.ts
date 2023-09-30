    import { DeleteUserUseCase } from "../../application/deleteUserUseCase";
    import { Request, Response } from "express";


    export class DeleteUserController {

        constructor(readonly deleteUserUseCase: DeleteUserUseCase) {}
      
        async deleteUser(req: Request, res: Response) {
            try {
                const userId = req.params.userId; // Assuming userId is in the URL params
                const userDeleted = await this.deleteUserUseCase.delete(userId);
    
                if (userDeleted) {
                    return res.status(200).json({
                        status: "success",
                        message: "Usuario eliminado"
                    });
                }
    
                return res.status(404).json({
                    status: "error",
                    message: "Usuario no encontrado o no se puede eliminar"
                });
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