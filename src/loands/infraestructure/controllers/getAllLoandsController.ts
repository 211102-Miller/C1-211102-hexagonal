import { GetAllLoandsUseCase } from "../../application/getAllLoandsUseCase";
import { Request, Response } from "express";


export class GetAllLoanController{
    constructor( readonly getAllLoandsUseCase: GetAllLoandsUseCase) {}

    async getAllLoand(req: Request, res: Response) {
        try {
          const loand = await this.getAllLoandsUseCase.getAllLoand();
          
          if (loand && loand.length > 0) {
            return res.status(200).json({
              status: 'success',
              data: loand,
              message: 'Lista de Loan Exitosamente',
            });
          }
          return res.status(404).json({
            status: 'error',
            message: 'No se encontraron Loan',
          });
        } catch (error) {
          console.error('Error retrieving user list:', error);
          return res.status(500).json({
            status: 'error',
            message: 'Error inesperado, por favor inténtelo de nuevo',
          });
        }
      }
    }