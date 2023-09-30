import { query } from '../../database/mysql';
import { ListRead } from '../domain/listRead';
import { ListReadRepository } from '../domain/listReadRepositoy';


export class MysqListReadRepository implements ListReadRepository{

    async createRead(id_user: number, list_title: string, descriptions: string, status: boolean, id_books: string | null = null): Promise<ListRead | null> {
        try {
            // Verifica si el usuario existe antes de continuar
            const userCheckQuery = "SELECT COUNT(*) as userCount FROM users WHERE id = ?";
            const userCheckParams: any[] = [id_user];
            const [userCheckResult]: any = await query(userCheckQuery, userCheckParams);

            if (userCheckResult.userCount === 0) {
                return null; // Usuario no encontrado, devuelve null o maneja el error adecuadamente
            }

            const sql = "INSERT INTO listreads (id_user, list_title, descriptions, id_books, status) VALUES (?, ?, ?, ?, ?)";
            const params: any[] = [id_user, list_title, descriptions, id_books, status];
            const [result]: any = await query(sql, params);

            return new ListRead(result.id, id_user, list_title, descriptions, '', status);
        } catch (error) {
            return null;
        }
    }
    async getAll(): Promise<ListRead[] | null> {
        const sql = "SELECT * FROM listreads";
        try {
            
            const [result]: any = await query(sql,[]);
            const  dataRead = Object.values(JSON.parse(JSON.stringify(result)))

            return (dataRead).map((listRead:any)=>
                new ListRead(
                    listRead.id,
                    listRead.id_user,
                    listRead.list_title,
                    listRead.description,
                    listRead.id_books,
                    listRead.status           
                )
            );
          } catch (error) {
            console.error("Error al obtener la lista de libros:", error);
            return null;
          }
    }
    async getAllStatus(): Promise<ListRead[] | null> {
        try {
            // Filtra los libros donde canLent es false
            const sql = "SELECT * FROM listreads WHERE status = true";
            const [rows]: any = await query(sql,[]);
    
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }
    
            const books: ListRead[] = rows.map(row => {
                return new ListRead(
                    row.id,
                    row.id_user,
                    row.list_title,
                    row.descriptions, 
                    row.id_books, 
                    row.status
                );
            });
    
            return books;
    
        } catch (error) {
            console.error('Error al obtener lista activa:', error);
            return null;
        }
    }

    async creeateUrl(id: number): Promise<ListRead | null> {
        throw null;
    }
}