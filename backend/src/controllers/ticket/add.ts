import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import Ticket from '../../models/Ticket';

export const addTicketSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  contactInfo: Joi.string().required()
});

interface AddReqBody {
  title: String;
  description: String;
  contactInfo: String;
  status: Number;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { title, description, contactInfo } = req.body;
  const status = 1;

  const ticket = new Ticket({
    title, description, contactInfo, status
  });
  await ticket.save();

  res.send({
    message: 'Saved',
    ticket: ticket.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addTicketSchema } });
