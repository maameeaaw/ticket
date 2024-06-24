import {
  Model, Schema, model, Document
} from 'mongoose';

export interface ITicket extends Document {
  title: string,
  description: string,
  contactInfo: string,
  status: number,
  createdAt: Date,
  updatedAt: Date
}

interface ITicketModel extends Model<ITicket> { }

const schema = new Schema<ITicket>({
  title: { type: String, index: true, required: true },
  description: { type: String, index: true, required: true },
  contactInfo: { type: String, index: true, required: true },
  status: { type: Number, index: true, required: true }
}, { timestamps: true });

const Ticket: ITicketModel = model<ITicket, ITicketModel>('Ticket', schema);

export default Ticket;
