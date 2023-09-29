import express from 'express';
import { Signale } from 'signale';
import { connectToPostgreSQL } from './database/postgresql';
import { bookRoutes } from './books/infraestructure/bookRutes';

const app = express();
const signale = new Signale();
const port = 3000;

app.use(express.json());
app.use("/book",bookRoutes)



//connectToPostgreSQL();

app.listen(port, () => {
  signale.success(`Servidor escuchando en el puerto ${port}`)
});