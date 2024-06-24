import { Request, RequestHandler } from 'express';
import Joi, { number } from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import Ticket from '../../models/Ticket';

export const updateTicketStatusSchema = Joi.object().keys({
  id: Joi.string().required(),
  status: Joi.number().required()
});

// const buildTicketUpdateQuery = (id: string, status: number): { [key: string]: any } => {
// const query: any = {};
// query._id = id
// query.status = status
// return query
// }

interface UpdateBody {
  id: string;
  status: number;
}

const updateStatus: RequestHandler = async (req: Request<{}, {}, UpdateBody>, res) => {
  const { id, status } = req.body;

  const ticket = await Ticket.updateOne(
    { _id: id },
    { $set: { status } }
  );

  res.send({
    message: 'Saved'
  });
};

export default requestMiddleware(updateStatus, { validation: { body: updateTicketStatusSchema } });
