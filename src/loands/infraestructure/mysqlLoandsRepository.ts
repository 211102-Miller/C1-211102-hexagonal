import { query } from "../../database/mysqlUserRepository";
import { Loand } from "../domain/loands";
import { LoandRepository } from "../domain/loandsRepository";


export class MysqlLoandsRepository implements LoandRepository {

    async getAllLoans(): Promise<Loand[]> {
        try {
          const sql = `
            SELECT *
            FROM loands
          `;
          const params: any[] = [];  // No hay parámetros en esta consulta
          const [rows]: any = await query(sql, params);
      
          const prestamos: Loand[] = rows.map((row: any) => {
            return new Loand(
              row.id,
              row.loand,
              row.delivers,
              row.status,
              row.id_Book,
              row.id_User
            );
          });
      
          return prestamos;
        } catch (error) {
          console.error('Error al listar los prestamos:', (error as Error).message);
          throw new Error('Error al listar los prestamos');
        }
    }

    async  getLoand(id: number): Promise<Loand | null> {
        try {
          const sql = "SELECT * FROM Loands WHERE id = ?";//deve existir un usuario
          const params: any[] = [id];
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            const Loands = result[0];
            return new Loand(
                Loands.id,
                Loands.loan,
                Loands.delivery,
                Loands.status,
                Loands.id_Book,
                Loands.id_User
            );
          } else {
            return null; // No se encontró un préstamo con el ID especificado
          }
        } catch (error) {
          console.error("Error al obtener el préstamo por ID:", error);
          return null;
        }
        
    }
    async deleteLoands(id: string): Promise<boolean> {
        try {
          // SQL query to delete a loan by its ID
          const sql = `
            DELETE FROM Loands
            WHERE id = ?
          `;
          
          // Parameters for the SQL query (loanId as the parameter)
          const params: any[] = [id || null];  // Replace undefined with null
          
          // Execute the SQL query with the provided parameters
          const [result]: any = await query(sql, params);
      
          // Check if a loan was affected by the delete operation
          if (!result || result.affectedRows === 0) {
            throw new Error(`No se encontró un loan con el ID ${id}`);
          }
      
          console.log(`Préstamo con ID ${id} eliminado correctamente.`);
      
          return true;
        } catch (error) {
          console.error('Error al eliminar el loan:', (error as Error).message);
          throw new Error('Error al eliminar un loan');
        }
      }
}