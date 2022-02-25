import Express, { Request, Response } from 'express';
import Rescue from 'express-rescue';
import Cors from 'cors';
import HandleError from './middlewares/HandleError';
import UserRouter from './routers/UserRouter';

const app = Express();

app.use(Cors());
app.use(Express.json());

app.get('/', async (req: Request, resp: Response) => resp.status(200).json({
  message: 'API OLINE!!',
}));

app.use('/user', Rescue(UserRouter));

app.use(HandleError.HandleError);

export default app;
