import { Request, Response } from "express";
import { DeleteLoanUseCase } from "../../application/deleleteLoandUseCase";



export class DeleteLoanController{
    constructor(readonly deleteLoanUseCase: DeleteLoanUseCase) {}

    async deleteLoand(req: Request, res: Response) {
        try {
            const id = req.params.id; // Assuming userId is in the URL params
            const deleteLoand = await this.deleteLoanUseCase.delete(id)

            if (deleteLoand) {
                return res.status(200).json({
                    status: "success",
                    message: "Prestamo eliminado"
                });
            }

            return res.status(404).json({
                status: "error",
                message: "no se puede eliminar"
            });
        } catch (error) {
            console.error('Error deleting :', error);
            return res.status(500).json({
                status: "error",
                message: "Error inesperado porfavor intente de nuevo"
            });
        }
    }

}