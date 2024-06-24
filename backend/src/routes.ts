import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as TicketController from './controllers/ticket';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// ticket routes
router.post('/ticket/add', TicketController.add);
router.get('/ticket/all', TicketController.all);
router.post('/ticket/update/status', TicketController.updateStatus);
router.post('/ticket/update/contact', TicketController.updateContactInfo);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
