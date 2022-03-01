import Express, { Request, Response } from 'express';
import Cors from 'cors';
import HandleError from './middlewares/HandleError';
import UserRouter from './routers/UserRouter';
import FavoritesRouter from './routers/FavoritesRoutes';
import CompletedRouter from './routers/CompletedRoute';
import UncompletedRoute from './routers/UncompletedRoute';

const app = Express();

app.use(Cors());
app.use(Express.json());

app.get('/', async (_req: Request, resp: Response) => resp.status(200).json({
  message: 'API OLINE!!',
}));

app.use('/user', UserRouter);
app.use('/favorites', FavoritesRouter);
app.use('/completed', CompletedRouter);
app.use('/uncompleted', UncompletedRoute);

app.use(HandleError.HandleError);

export default app;
