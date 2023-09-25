//import { query } from '../../database/postgresql';
import { query } from '../../database/mysql';
import { connectToPostgreSQL } from '../../database/postgresql';
import { BookRepository } from "../domain/bookRepositoy"
import { Book } from '../domain/book';

export class MysqlBookRepository implements BookRepository{

     async createBook(
         title: string, 
         author: string, 
         img_url: string, 
         status: string, 
         is_loaded: boolean
         ): Promise<Book|null> {
        try {
            const sql = "INSERT INTO BOOKS (title,author,img_url,status,is_loaded) VALUES(?,?,?,?,?)";
            const params: any[] = [title,author,img_url,status,is_loaded];
            const [result]:any = await query(sql,params);
            return new Book(result.id,title,author,img_url,status,is_loaded);
        } catch (error) {
            return null;
        }
    }
    async getAll():Promise<Book[]|null>{
        const sql = "SELECT * FROM BOOKS";
        try {
            
            const [result]: any = await query(sql,[]);
            const  dataBooks = Object.values(JSON.parse(JSON.stringify(result)))

            return (dataBooks).map((book:any)=>
                new Book(
                    book.id,
                    book.title,
                    book.author,
                    book.img_url,
                    book.status,
                    book.is_loaded                
                )
            );
          } catch (error) {
            console.error("Error al obtener la lista de libros:", error);
            return null;
          }
    }
    async getBook(id: number): Promise<Book | null> {
        try {
          const sql = "SELECT * FROM BOOKS WHERE id = ?";
          const params: any[] = [id];
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            const bookData = result[0];
            return new Book(
              bookData.id,
              bookData.title,
              bookData.author,
              bookData.img_url,
              bookData.status,
              bookData.is_loaded
            );
          } else {
            return null; // No se encontró un libro con el ID especificado
          }
        } catch (error) {
          console.error("Error al obtener el libro por ID:", error);
          return null;
        }
     
    }
    async updataStatus(id: number, newStatus: string): Promise<Book | null> {
        try {
          const sql = "UPDATE BOOKS SET status = ? WHERE id = ?";
          const params: any[] = [newStatus, id];
          
          // Ejecuta la consulta de actualización en la base de datos
          const [result]: any = await query(sql, params);
      
          if (result && result.affectedRows > 0) {
            // Si al menos una fila fue afectada por la actualización, significa que se actualizó con éxito
            // Obtén el libro actualizado de la base de datos
            const updatedBook = await this.getBook(id);
            return updatedBook;
          } else {
            return null; // No se encontró un libro con el ID especificado o no se actualizó ningún registro
          }
        } catch (error) {
          console.error("Error al actualizar el estado del libro:", error);
          return null; // Puedes manejar el error de alguna manera adecuada
        }
    }
    async getBookInactive(status: string): Promise<Book[] | null> {
        try {
          const sql = "SELECT * FROM BOOKS WHERE status = ?";
          const params: any[] = [status];
      
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            // Mapea los resultados en objetos Book
            const inactiveBooks = result.map((bookData: any) => new Book(
              bookData.id,
              bookData.title,
              bookData.author,
              bookData.img_url,
              bookData.status,
              bookData.is_loaded
            ));
      
            return inactiveBooks;
          } else {
            return [];
          }
        } catch (error) {
          console.error("Error al obtener la lista de libros inactivos:", error);
          return null;
        }
    }
    async updateBookLead(id: number, is_loaded: boolean): Promise<Book | null> {
        try {
          const sql = "UPDATE BOOKS SET is_loaded = ? WHERE id = ?";
          const params: any[] = [is_loaded, id];
      
          
          const [result]: any = await query(sql, params);
      
          if (result && result.affectedRows > 0) {
           
            const updatedBook = await this.getBook(id);
            return updatedBook;
          } else {
            return null; // No se encontró un libro con el ID especificado o no se actualizó ningún registro
          }
        } catch (error) {
          console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
          return null; 
        }
    }
    async deleteBook(id: number): Promise<Book | null> {
        try {
          const deletedBook = await this.getBook(id); 
          if (!deletedBook) {
            return null;
          }
          
          const sql = "DELETE FROM BOOKS WHERE id = ?";
          const params: any[] = [id];
          const [result]: any = await query(sql, params);
      
          if (result && result.affectedRows > 0) {
            return deletedBook;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error al eliminar el libro:", error);
          return null; 
        }
    }
    async updateBook(
        id: number,
        title: string,
        author: string,
        img_url: string,
        status: string,
        is_loaded: boolean
      ): Promise<Book | null> {
        try {
          const sql = `
            UPDATE BOOKS
            SET
              title = ?,
              author = ?,
              img_url = ?,
              status = ?,
              is_loaded = ?
            WHERE id = ?
          `;
          const params: any[] = [title, author, img_url, status, is_loaded, id];
      
          // Ejecuta la consulta de actualización en la base de datos
          const [result]: any = await query(sql, params);
      
          if (result && result.affectedRows > 0) {
            // Si al menos una fila fue afectada por la actualización, significa que se actualizó con éxito
            // Obtén el libro actualizado de la base de datos
            const updatedBook = await this.getBook(id);
            return updatedBook;
          } else {
            return null; // No se encontró un libro con el ID especificado o no se actualizó ningún registro
          }
        } catch (error) {
          console.error("Error al actualizar el libro:", error);
          return null; // Puedes manejar el error de alguna manera adecuada
        }
    }
    async getBookFilter(filter: string,title?: string | undefined,author?: string | undefined,):Promise<Book[] |null>{
        try {
            let sql : string;
            let value : string | undefined;

            switch (filter) {
                case 'title':
                    if (!title)throw new Error("Se requiere el titulo para filtrar");
                    sql = 'SELECT * FROM books WHERE title = ?'
                    value = title;
                    break;
                case 'author':
                    if (!author)throw new Error("Se requiere el autor para filtrar");
                    sql = 'SELECT * FROM books WHERE author = ?'
                    value = author;
                    break;
            
                default:
                    throw new Error('Invalid filter type')
                    break;
            }
            const [rows]: any = await query(sql, [value]);
            if (!rows || rows.length === 0) return null;

            return rows.map((row: Book) => new Book(
                row.id,
                row.title,
                row.author,
                row.img_url,
                row.status,
                row.is_loaded
            ));
        } catch (error) {
            return null
        }
        
    }
      
    
    
}