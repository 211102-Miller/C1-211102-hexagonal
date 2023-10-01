import { query } from "../../database/mysqlUserRepository";
import { Review } from "../domain/review";
import { ReviewRepository } from "../domain/reviewRepository";

export class MysqlReviewRepository implements ReviewRepository{

    async getAllReview():Promise<Review[]|null>{
        const sql ="SELECT * FROM REVIEW"
        try {
            const [result]:any = await query(sql,[]);
            const dataReviews = Object.values(JSON.parse(JSON.stringify(result)));
            
            return (dataReviews).map((review:any) =>
                new Review(
                    review.id,
                    review.id_User,
                    review.id_Book,
                    review.review_text,
                    review.status
                )
            )
        } catch (error) {
            console.error("Error al obtener la lista de reseñas:", error);
            return null;
        }
    }

    async createReview(id_user: number, id_book: number, review_text: string,status:boolean): Promise<Review | null> {
        try {
            // Validación de existencia de id_user y id_book antes de la inserción
            const userCheckSql = `
                SELECT 1
                FROM Users
                WHERE id = ?
                LIMIT 1;
            `;

            const bookCheckSql = `
                SELECT 1
                FROM Books
                WHERE id = ?
                LIMIT 1;
            `;

            const [userResult]: any = await query(userCheckSql, [id_user]);
            const [bookResult]: any = await query(bookCheckSql, [id_book]);

            if (!userResult || !userResult.length || !bookResult || !bookResult.length) {
                throw new Error('El usuario o el libro especificado no existe.');
            }

            // Si tanto el usuario como el libro existen, proceder con la inserción de la reseña
            const insertSql = `
                INSERT INTO Review (id_User, id_Book, review_text,status)
                VALUES (?, ?, ?, ?)
            `;
            
            const params: any[] = [id_user, id_book, review_text,status];
            const [result]: any = await query(insertSql, params);

            if (!result || !result.insertId) {
                throw new Error('No se pudo obtener el ID de la reseña insertada.');
            }

            const reviewId = result.insertId;
            const review = new Review(reviewId, id_user, id_book, review_text,status);

            return review;
        } catch (error) {
            console.error('Error al agregar una reseña:', error);
            throw new Error('Error al agregar una reseña.');
        }
    }
    async getReview(id_User:number):Promise<Review | null>{
        try {
            const sql = "SELECT * FROM review WHERE id = ?";
            const params :any[] = [id_User];
            const [result]: any = await query(sql,params)

            if (result && result.length > 0) {
                const dataReview = result[0];
                return new Review(
                  dataReview.id,
                  dataReview.id_User,
                  dataReview.id_Book,
                  dataReview.review_text,
                  dataReview.status
                );
              } else {
                return null; // No se encontró un libro con el ID especificado
              }
        } catch (error) {
            console.error("Error al obtener la reseña por ID:", error);
            return null
        }
    }
    async updateReviweInactive(id: number): Promise<Review | null> {
        try {
          // Verificar si la revisión con el ID existe en la base de datos
          const existingReview = await this.getReview(id);
    
          if (!existingReview) {
            return null; // No se encontró una revisión con el ID especificado
          }
    
          // Crear una nueva instancia de Review con el valor "status" actualizado a 'false'
          const updatedReview = new Review(
            existingReview.id,
            existingReview.id_user,
            existingReview.id_book,
            existingReview.review_text,
            false // Actualizamos "status" a 'false'
          );
    
          // Actualizar la revisión en la base de datos
          const updateSql = `
            UPDATE Review
            SET status = ?
            WHERE id = ?;
          `;
    
          const params: any[] = [updatedReview.status, updatedReview.id];
          await query(updateSql, params);
    
          return updatedReview; // Retorna la revisión actualizada
        } catch (error) {
          console.error("Error al actualizar la revisión:", error);
          return null; // Error al actualizar la revisión
        }
    }
    async getReviewsInactive(status:boolean):Promise<Review[]| null>{
        try {
            const sql ="SELECT * FROM REVIEW WHERE status = ?"
            const params : any[] = [status];

            const [result]:any = await query(sql,params);

            if (result && result.length > 0) {
                // Mapea los resultados en objetos Book
                const inactiveRerviews = result.map((dataReview: any) => new Review(
                  dataReview.id,
                  dataReview.id_User,
                  dataReview.id_Book,
                  dataReview.review_text,
                  dataReview.status
                ));
          
                return inactiveRerviews;
              } else {
                return [];
            }
        } catch (error) {
            console.error("Error al obtener la lista de libros inactivos:", error);
            return null;
        }
    }
    async deleteReview(id:number, id_User:number):Promise<Review | null>{
        try {
            try {
                const deletedReview = await this.getReview(id);
                
            
                if (!deletedReview) {
                  return null;
                }
            
                const sql = "DELETE FROM review WHERE id = ? AND id_User = ?";
                const params: any[] = [id, id_User];
                const [result]: any = await query(sql, params);
            
                if (result && result.affectedRows > 0) {
                  return deletedReview;
                } else {
                  return null;
                }
              } catch (error) {
                console.error("Error al eliminar el libro:", error);
                return null;
              }
            
        } catch (error) {
            return null
        }
    }
    async getFilterReviewUser(id_User: number): Promise<Review[] | null> {
        try {
          const sql = "SELECT * FROM REVIEW WHERE id_User = ?";
          const params: any[] = [id_User];
      
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            // Mapea los resultados en objetos Review
            const reviews = result.map((dataReview: any) => new Review(
              dataReview.id,
              dataReview.id_User,
              dataReview.id_Book,
              dataReview.review_text,
              dataReview.status
            ));
      
            return reviews;
          } else {
            return [];
          }
        } catch (error) {
          console.error("Error al obtener la lista de reseñas del usuario:", error);
          return null;
        }
    }
    async putReviewUser(id: number, id_User: number, review_text: string): Promise<Review | null> {
      try {
        const sql = "UPDATE REVIEWS SET review_text = ? WHERE id = ? AND id_user = ?";
        const params: any[] = [review_text, id, id_User];
    
        // Ejecuta la consulta de actualización en la base de datos
        const [result]: any = await query(sql, params);
    
        if (result && result.affectedRows > 0) {
          // Si al menos una fila fue afectada por la actualización, significa que se actualizó con éxito
          // Obtén la revisión actualizada de la base de datos
          const updatedReview = await this.getReview(id);
          return updatedReview;
        } else {
          return null; // No se encontró una revisión con el ID y el ID de usuario especificados o no se actualizó ningún registro
        }
      } catch (error) {
        console.error("Error al actualizar el campo 'review_text' de la revisión:", error);
        return null; // Puedes manejar el error de alguna manera adecuada
      }
    }
}