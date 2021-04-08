import { Router } from 'express';
import ClientController from './controllers/ClientController'
import SessionController from './controllers/SessionController'
import authMiddleware from './middlewares/auth'

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.findAll);
routes.get('/clients/:id', ClientController.findOne);

routes.use(authMiddleware)

routes.get('/clients/self/info', ClientController.findSelf);
routes.delete('/clients', ClientController.destroy);
routes.put('/clients', ClientController.update);


export default routes;
