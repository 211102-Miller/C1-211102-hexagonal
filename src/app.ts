import express from 'express';
import { Signale } from 'signale';

import { connectToPostgreSQL } from './database/postgresql';





import { loandReviews } from './reviews/infraestructure/reviewRoutes';

const app = express();
const signale = new Signale();
const port = 3000;

app.use(express.json());




app.use('/review',loandReviews)






//connectToPostgreSQL();

app.listen(port, () => {
  signale.success(`Servidor escuchando en el puerto ${port}`)
});