import { Request, RequestHandler } from 'express';
import Joi, { number } from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import Ticket from '../../models/Ticket';

export const updateTicketContactSchema = Joi.object().keys({
  id: Joi.string().required(),
  contactInfo: Joi.string().required()
});

// const buildTicketUpdateQuery = (id: string, status: number): { [key: string]: any } => {
// const query: any = {};
// query._id = id
// query.status = status
// return query
// }

interface UpdateBody {
  id: string;
  contactInfo: string;
}

const updateStatus: RequestHandler = async (req: Request<{}, {}, UpdateBody>, res) => {
  const { id, contactInfo } = req.body;

  const ticket = await Ticket.updateOne(
    { _id: id },
    { $set: { contactInfo } }
  );

  res.send({
    message: 'Saved'
  });
};

export default requestMiddleware(updateStatus, { validation: { body: updateTicketContactSchema } });
