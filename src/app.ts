import express from 'express';
import { Signale } from 'signale';
import { userRoutes } from './users/insfraestructure/userRoutes';
import { connectToPostgreSQL } from './database/postgresql';


const app = express();
const signale = new Signale();
const port = 3000;

app.use(express.json());
app.use("/user",userRoutes)



//connectToPostgreSQL();

app.listen(port, () => {
  signale.success(`Servidor escuchando en el puerto ${port}`)
});