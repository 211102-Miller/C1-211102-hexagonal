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

  async filterUser(filter: string, email?: string, name?: string): Promise<User[]> {
    const validFilters = ['email', 'name'];

    if (!validFilters.includes(filter)) {
      throw new Error('typo invalido');
    }

    if ((filter === 'email' && !email) || (filter === 'name' && !name)) {
      throw new Error(`${filter.charAt(0).toUpperCase() + filter.slice(1)} error  ${filter}`);
    }

    const sql = `SELECT * FROM users WHERE ${filter} = ?`;
    const value = filter === 'email' ? email : name;

    try {
      const [rows]: any = await query(sql, [value]);

      // Si no hay resultados, devolver un array vacío
      if (!rows || rows.length === 0) {
        return [];
      }

      // Mapear los resultados a objetos User
      const users: User[] = rows.map((row: User) => new User(row.id, row.name, row.password, row.email, row.status));  // Asegúrate de que 'status' sea accesible en 'row'
      return users;
    } catch (error) {
      throw new Error('Error al obtener');
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

}





