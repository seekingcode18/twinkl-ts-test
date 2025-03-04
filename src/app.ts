import express, { Express } from 'express';
import routes from './routes/index.ts';

const app: Express = express();

app.use(express.json());

app.use('/', routes);

export default app;
