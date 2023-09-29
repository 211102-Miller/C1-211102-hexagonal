import { Client } from 'pg';
import dotenv from 'dotenv';
import { Signale } from 'signale';


const signale = new Signale();
dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_DATABASE || 'SOA',
    password: process.env.DB_PASSWORD|| 'Miller2001Lopez',
    port: 5433, // El puerto predeterminado de PostgreSQL es 5432
};

const client = new Client(config);

async function connectToPostgreSQL() {
    try {
        await client.connect();
        signale.success('Conexión exitosa a la base de datos PostgreSQL');
    } catch (error) {
        signale.error('Error al conectar a PostgreSQL:', error);
    }
} 




export async function query(sql: string, params: any[]) {
    try {
        const result = await client.query(sql, params);
        signale.success("Conexión exitosa a la BD");
        return result;
    } catch (error) {
        signale.error('Error al ejecutar la consulta:', error);
        return null;
    }
}

export { client, connectToPostgreSQL };