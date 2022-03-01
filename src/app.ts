import Express, { Request, Response } from 'express';
import Cors from 'cors';
import HandleError from './middlewares/HandleError';
import UserRouter from './routers/UserRouter';
import CollectionRouter from './routers/CollectionRouter';
import CategoriesRouter from './routers/CategoriesRouter.ts';

const app = Express();

app.use(Cors());
app.use(Express.json());

app.get('/', async (_req: Request, resp: Response) => resp.status(200).json({
  message: 'API OLINE!!',
}));

app.use('/user', UserRouter);
app.use('/collections', CollectionRouter);
app.use('/categories', CategoriesRouter);

app.use(HandleError.HandleError);

export default app;
