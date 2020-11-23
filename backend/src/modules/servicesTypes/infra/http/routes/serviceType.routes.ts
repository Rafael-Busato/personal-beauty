import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import createServicesTypes from '../controllers/createServicesTypes';
import createSubServices from '../controllers/createSubServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const serviceTypeRouter = Router();
const providersController = new createServicesTypes();
const providerSubServicesController = new createSubServices();

serviceTypeRouter.use(ensureAuthenticated);
serviceTypeRouter.post('/serviceType', providersController.create);

serviceTypeRouter.put('/subServices/:id', providerSubServicesController.update);
serviceTypeRouter.get('/listServicesType', providerSubServicesController.index);
serviceTypeRouter.get(
  '/specificSubService/:id',
  providerSubServicesController.show,
);

export default serviceTypeRouter;