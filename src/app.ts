import express from 'express';
import { Signale } from 'signale';
import { connectToPostgreSQL } from './database/postgresql';
import { bookRoutes } from './books/infraestructure/bookRutes';
import { userRoutes } from './users/insfraestructure/userRoutes';


const app = express();
const signale = new Signale();
const port = 3000;

app.use(express.json());
app.use("/book",bookRoutes)
app.use("/user",userRoutes)




//connectToPostgreSQL();

app.listen(port, () => {
  signale.success(`Servidor escuchando en el puerto ${port}`)})