import { query } from '../../database/mysqlUserRepository';
import { UserRepository } from '../domain/userRepository';
import { User } from '../domain/user';

export class MysqlUserRepository implements UserRepository {

  async createUser(name: string, password: string, email: string, status: boolean): Promise<User> {
    try {
      const sql = `
            INSERT INTO users (name, password, email, status)
            VALUES (?, ?, ?, ?)
          `;
      const params: any[] = [name, password, email, status];
      const [result]: any = await query(sql, params);

      const userId = result.insertId;
      const user = new User(userId.toString(), name, password, email, status);


      if (!result || !result.insertId) {
        throw new Error('No se pudo obtener el ID del usuario insertado.');
      }

      return user;
    } catch (error) {
      console.error('Error al agregar un usuario:', error);
      throw new Error('Error al agregar un usuario.');
    }
  }
  async getAllUsers(): Promise<User[]> {
    try {
      const sql = `
            SELECT id, name, password, email, status
            FROM users
          `;
      const params: any[] = [];  // No hay parámetros en esta consulta
      const [rows]: any = await query(sql, params);

      const users: User[] = rows.map((row: any) => {
        return new User(
          row.id.toString(),
          row.name,
          row.password,
          row.email,
          row.status
        );
      });

      return users;
    } catch (error) {
      console.error('Error al listar usuarios:', (error as Error).message);
      throw new Error('Error al listar usuarios');
    }
  }
  async deleteUser(userId: string): Promise<boolean> {
    try {
      const sql = `
        DELETE FROM users
        WHERE id = ?
      `;
      const params: any[] = [userId];
      const [result]: any = await query(sql, params);
  
      if (!result || result.affectedRows === 0) {
        throw new Error(`No se encontró un usuario con el ID ${userId}`);
      }
  
      console.log(`Usuario con ID ${userId} eliminado correctamente.`);
  
      return true;
    } catch (error) {
      console.error('Error al eliminar un usuario:', (error as Error).message);
      throw new Error('Error al eliminar un usuario');
    }
  }
  

  async getUser(id: number): Promise<User | null> {
    try {
      const sql = "SELECT * FROM users WHERE id = ?";
      const params: any[] = [id];
      const [result]: any = await query(sql, params);

      if (result && result.length > 0) {
        const iduser = result[0];
        return new User(
          iduser.id,
          iduser.name,
          iduser.password,
          iduser.email,
          iduser.status,
        );
      } else {
        return null; // No se encontró un libro con el ID especificado
      }
    } catch (error) {
      console.error("Error al obtener el usuairo por ID:", error);
      return null;
    }
  }

  async activeUser(id: number): Promise<User | null> {
    try {
      const sql = `
            UPDATE users
            SET status = true
            WHERE id = ?
          `;
      const params: any[] = [id];
      const [result]: any = await query(sql, params);

      if (!result || result.affectedRows === 0) {
        throw new Error(`No se encontró un usuario con el ID ${id}`);
      }


      const updatedUser = await this.getUser(id);
      return updatedUser;
    } catch (error) {
      console.error('Error al activar el usuario:', error);
      throw new Error('Error al activar el usuario');
    }
  }
  async getInactiveUser(): Promise<User[]> {
    try {
      const sql = `
            SELECT id, name, password, email, status
            FROM users
            WHERE status = false
          `;
      const params: any[] = [];  // No hay parámetros en esta consulta
      const [rows]: any = await query(sql, params);

      const users: User[] = rows.map((row: any) => {
        return new User(
          row.id.toString(),
          row.name,
          row.password,
          row.email,
          row.status
        );
      });

      return users;
    } catch (error) {
      console.error('No se pudo listar usuarios inactivos:', (error as Error).message);
      throw new Error('No se pudo listar usuarios inactivos:');
    }
  }
  async filterUser(filter: string, name?: string, email?: string): Promise<User[] | null> {
    try {
        let sql: string;
        let value: string | undefined;

        switch (filter) {
            case 'name':
                if (!name) throw new Error("Se requiere el titulo para filtrar");
                sql = 'SELECT * FROM users WHERE name = ?'
                value = name;
                break;
            case 'email':
                if (!email) throw new Error("Se requiere el autor para filtrar");
                sql = 'SELECT * FROM users WHERE email = ?'
                value = email;
                break;
            default:
                throw new Error('Invalid filter type')
        }
        const [rows]: any = await query(sql, [value]);
        if (!rows || rows.length === 0) {
            throw new Error("No se encontraron resultados.");
        }

        return rows.map((row: User) => new User(
            row.id,
            row.name,
            row.email,
            row.password,
            row.status
        ));
    } catch (error) {
        throw error; // Lanza el error para que se maneje en el controlador
    }
  }
  async updateUserPassword(id: number, newPassword: string): Promise<User | null> {
    try {
      const sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `;
      const params: any[] = [newPassword, id];
      const [result]: any = await query(sql, params);
  
      if (!result || result.affectedRows === 0) {
        throw new Error(`No se encontró un usuario con el ID ${id}`);
      }
  
      // Assuming you need to fetch and return the updated user
      const updatedUser = await this.getUser(id);
      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar ', error);
      throw new Error('Error al actualizar la contraseña ');
    }
  }
  async updateUser(
    id: number,
    newUser?: { name?: string; password?: string; email?: string; status?: string }
  ): Promise<User | null> {
    try {
      const { name, password, email, status } = newUser || {};

      const sql = `
            UPDATE users
            SET name = ?, password = ?, email = ?, status = ?
            WHERE id = ?
          `;

      const params: any[] = [name, password, email, status, id];
      const [result]: any = await query(sql, params);

      if (!result || result.affectedRows === 0) {
        throw new Error(`No se encontró el ID ${id}`);
      }

      // Obtener y devolver el usuario actualizado
      const updatedUser = await this.getUser(id);
      return updatedUser;
    } catch (error) {
      console.error('No se puede actualziar', error);
      throw new Error('No se puede actualizar');
    }
  }

  async deleteReviewUser(id_user: number,id_review:string): Promise<boolean> {
    try {
      const sql = `
      DELETE FROM Review
      WHERE id_User = ? AND id = ?
    `;
      const params: any[] = [id_user,id_review];
      const [result]: any = await query(sql, params);
  
      if (result.affectedRows > 0) {
        return true;
      } else {
        return false; // No se encontró el libro con el ID especificado o no se eliminaron registros
      }
    } catch (error) {
      console.error("Error al eliminar el libro y las reseñas asociadas:", error);
      return false;
    }    
  }

  async checkBookAvailability(bookId: number): Promise<boolean> {
    try {
      const sql = `
        SELECT is_loaded, status
        FROM books
        WHERE id = ?
      `;
      const params: any[] = [bookId];
      const [rows]: any = await query(sql, params);
  
      if (rows && rows.length > 0) {
        const book = rows[0];
        return book.is_loaded && book.status;
      }
  
      return false;
    } catch (error) {
      console.error('Error al verificar la disponibilidad del libro:', error);
      throw new Error('Error al verificar la disponibilidad del libro');
    }
  }
  
  async hasUserLoanedBook(userId: number, bookId: number): Promise<boolean> {
    try {
      const sql = `
        SELECT COUNT(*) AS count
        FROM loands
        WHERE id_User = ? AND id_Book = ? AND status = true;
      `;
      const params: any[] = [userId, bookId];
      const [rows]: any = await query(sql, params);
  
      return rows && rows.length > 0 && rows[0].count > 0;
    } catch (error) {
      console.error('Error al verificar si el usuario ha prestado el libro:', error);
      throw new Error('Error al verificar si el usuario ha prestado el libro');
    }
  }
  async performBookLoan(userId: number, bookId: number): Promise<void> {
    try {
      const updateBookSql = `
        UPDATE books
        SET is_loaded = false
        WHERE id = ?
      `;
      const updateBookParams: any[] = [bookId];
      await query(updateBookSql, updateBookParams);
  
      const prestamoDate = new Date();  // Fecha actual como fecha de préstamo
  
      // Sumar 30 días a la fecha de préstamo para la fecha de entrega
      const entregaDate = new Date();
      entregaDate.setDate(prestamoDate.getDate() + 30);  // Asumiendo un préstamo de 30 días
  
      const insertPrestamoSql = `
        INSERT INTO loands (loand, delivers, status,id_Book, id_User)
        VALUES (?, ?, true, ?, ?)
      `;
      const insertPrestamoParams: any[] = [prestamoDate, entregaDate, bookId, userId];
      await query(insertPrestamoSql, insertPrestamoParams);
    } catch (error) {
      console.error('Error al realizar el préstamo del libro:', error);
      throw new Error('Error al realizar el préstamo del libro');
    }
  }
  
  async loadBookUser(id_user: number, id_book: number): Promise<string | null> {
    try {
      const isBookAvailable = await this.checkBookAvailability(id_book);
  
      if (!isBookAvailable) {
        return "El libro no está disponible para préstamo.";
      }
  
      const hasLoanedBook = await this.hasUserLoanedBook(id_user, id_book);
  
      if (hasLoanedBook) {
        return "El usuario ya ha prestado este libro.";
      }
  
      await this.performBookLoan(id_user, id_book);
  
      return "Libro prestado exitosamente.";
    } catch (error) {
      console.error('Error al prestar el libro:', error);
      throw new Error('Error al prestar el libro');
    }
  }
  async returnBookLoad (id_user: number, id_book: number): Promise<string | null> {
    try {
      // Verificar si el usuario tiene el libro prestado
      const hasLoanedBook = await this.hasUserLoanedBook(id_user, id_book);
  
      if (!hasLoanedBook) {
        return "El usuario no ha prestado este libro.";
      }
  
      // Actualizar el estado de préstamo del libro a true
      const updateBookSql = `
        UPDATE books
        SET is_loaded = true
        WHERE id = ?
      `;
      const updateBookParams: any[] = [id_book];
      await query(updateBookSql, updateBookParams);
  
      // Marcar el préstamo como devuelto
      const updatePrestamoSql = `
        UPDATE loands
        SET status = false
        WHERE id_User = ? AND id_Book = ?
      `;
      const updatePrestamoParams: any[] = [id_user, id_book];
      await query(updatePrestamoSql, updatePrestamoParams);
  
      return "Libro devuelto exitosamente.";
    } catch (error) {
      console.error('Error al devolver el libro:', error);
      throw new Error('Error al devolver el libro');
    }
  }
  async writeReviewUser(id_user: number, id_Book: number, review_Text: string): Promise<boolean | null> {
    try {
        const sqlCheck = `
            SELECT COUNT(*) AS count
            FROM loands
            WHERE id_User = ? AND id_Book = ? AND status = false;
        `;
        const paramsCheck: any[] = [id_user, id_Book];
        const [rows]: any = await query(sqlCheck, paramsCheck);

        if (rows && rows.length > 0 && rows[0].count > 0) {
            const sqlInsert = `
                INSERT INTO Review (id_User, id_Book, review_text, status)
                VALUES (?, ?, ?, true)
            `;
            const paramsInsert: any[] = [id_user, id_Book, review_Text];
            const [result]: any = await query(sqlInsert, paramsInsert);

            if (result && result.insertId) {
                console.log(`Reseña guardada correctamente para el usuario con ID ${id_user} y el libro con ID ${id_Book}.`);
                return true;
            } else {
                throw new Error('No se pudo guardar la reseña.');
            }
        } else {
            return null; // El usuario no ha prestado y devuelto el libro
        }
    } catch (error) {
        console.error('Error al escribir la reseña:', error);
        throw new Error('Error al escribir la reseña');
    }
  }
  async updateReviewUser(id_user: number, id_book: number, updated_Review: string): Promise<boolean | null> {
    try {
      const selectSql = `
        SELECT id, status
        FROM Review
        WHERE id_User = ? AND id_Book = ?
      `;
      const selectParams: any[] = [id_user, id_book];
      const [selectResult]: any = await query(selectSql, selectParams);
  
      if (!selectResult || selectResult.length === 0) {
        throw new Error(`No se encontró una reseña`);
      }
  
      const { id, status } = selectResult[0];
  
      if (!status) {
        throw new Error(`La reseña con ID ${id} no está activa (status = false) y no se puede actualizar.`);
      }
  
      const updateSql = `
        UPDATE Review
        SET review_text = ?
        WHERE id = ?
      `;
      const updateParams: any[] = [updated_Review, id];
      const [updateResult]: any = await query(updateSql, updateParams);
  
      if (!updateResult || updateResult.affectedRows === 0) {
        throw new Error(`No se pudo actualizar la reseña con ID ${id}`);
      }
  
      console.log(`Reseña con ID ${id} actualizada correctamente para el usuario con ID ${id_user} y el libro con ID ${id_book}.`);
      return true;
    } catch (error) {
      console.error('Error al actualizar la reseña:', (error as Error).message);
      throw new Error('Error al actualizar la reseña');
    }

  }
  async loginUser(email: string, password: string): Promise<User | null> {
    try {

      const sqlSelect = `
        SELECT id, name, password, email, status
        FROM users
        WHERE email = ? AND password = ?
      `;
      const paramsSelect: any[] = [email, password];
      const [rows]: any = await query(sqlSelect, paramsSelect);
  
      // Si no se encuentra un usuario con el email y contraseña proporcionados
      if (!rows || rows.length === 0) {
        return null;
      }
  
      const userId = rows[0].id.toString();
  
      // Actualizar el status a true
      const sqlUpdateStatus = `
        UPDATE users
        SET status = ?
        WHERE id = ?
      `;
      const paramsUpdateStatus: any[] = [true, userId];
      await query(sqlUpdateStatus, paramsUpdateStatus);
  
      // Devolver el usuario encontrado con el status actualizado
      const user = new User(
        userId,
        rows[0].name,
        rows[0].password,
        rows[0].email,
        true
      );
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión');
    }
  }

  async signoffUser(id: number): Promise<User | null> {
    try {
      const sql = `
        UPDATE users
        SET status = false
        WHERE id = ?
      `;
      const params: any[] = [id];
      const [result]: any = await query(sql, params);
  
      if (!result || result.affectedRows === 0) {
        throw new Error(`No se encontró un usuario con el ID ${id}`);
      }
  
      // Obtener y devolver el usuario actualizado
      const updatedUser = await this.getUser(id);
      return updatedUser;
    } catch (error) {
      console.error('Errro al cerar sesion:', error);
      throw new Error('Error al cerrar sesion');
    }
  }

}



