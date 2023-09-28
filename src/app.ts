import express from 'express';
import { Signale } from 'signale';
import { userRoutes } from './users/insfraestructure/UserRoutes';
import { connectToPostgreSQL } from './database/postgresql';
import { bookRoutes } from './books/infraestructure/bookRutes';
import { reviewRoutes } from './rewies/insfraestructure/reviewRoutes';

const app = express();
const signale = new Signale();
const port = 3000;

app.use(express.json());
app.use("/user",userRoutes)
app.use("/book",bookRoutes)
app.use("/review",reviewRoutes)


//connectToPostgreSQL();

app.listen(port, () => {
  signale.success(`Servidor escuchando en el puerto ${port}`)
});