import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Ticket from '../../models/Ticket';

const all: RequestHandler = async (req, res) => {
  const ticket = await Ticket.aggregate([
    {
      $group: {
        _id: '$status', // Group by the 'status' field
        tasks: {
          $push: {
            id: '$_id',
            title: '$title',
            description: '$description',
            contactInfo: '$contactInfo',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt'
          }
        }
      }
    }, {
      $unwind: '$tasks'
    },
    {
      $sort: { 'tasks.updatedAt': -1 } // Sort tasks by 'createdAt' in ascending order
    },
    {
      $group: {
        _id: '$_id',
        tasks: { $push: '$tasks' }
      }
    }
  ]).sort({ _id: 'asc' });
  res.send(ticket);
};

export default requestMiddleware(all);
