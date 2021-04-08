import { Router } from 'express';
import ClientController from './controllers/ClientController'
import SessionController from './controllers/SessionController'
import authMiddleware from './middlewares/auth'

import swaggerUi from 'swagger-ui-express';
const swaggerDocument =  require('./swagger.json');

const routes = new Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.post('/sessions', SessionController.store);
routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.findAll);
routes.get('/clients/:id', ClientController.findOne);

routes.use(authMiddleware)

routes.get('/clients/self/info', ClientController.findSelf);
routes.delete('/clients', ClientController.destroy);
routes.put('/clients', ClientController.update);


export default routes;
