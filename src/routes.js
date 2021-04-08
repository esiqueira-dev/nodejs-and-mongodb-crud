import { Router } from 'express';
import ClientController from './controllers/ClientController'
import SessionController from './controllers/SessionController'

const routes = new Router();

routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.findAll);
routes.get('/clients/self', ClientController.findSelf);
routes.get('/clients/:id', ClientController.findOne);
routes.delete('/clients', ClientController.destroy);
routes.put('/clients', ClientController.update);

routes.post('/sessions', SessionController.store);

export default routes;
