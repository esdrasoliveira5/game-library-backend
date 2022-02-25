import express, { Request, Response } from 'express';
import 'express-async-errors';
import HandleError from './middlewares/HandleError';

const app = express();
app.get('/', async (req: Request, resp: Response) => resp.status(200).json({
  message: 'API OLINE!!',
}));

app.use(express.json());

app.use(HandleError.HandleError);

export default app;
