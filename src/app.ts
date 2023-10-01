import express from 'express';
import { Signale } from 'signale';

import { connectToPostgreSQL } from './database/postgresql';



import { loandRouter } from './loands/infraestructure/loandsRoutes';

const app = express();
const signale = new Signale();
const port = 3000;

app.use(express.json());



app.use('/loand',loandRouter)






//connectToPostgreSQL();

app.listen(port, () => {
  signale.success(`Servidor escuchando en el puerto ${port}`)
});