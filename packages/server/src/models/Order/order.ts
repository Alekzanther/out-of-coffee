import { Schema, model, SchemaTypes } from 'mongoose';

export const OrderSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'delivered'],
    default: 'pending',
  },
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
  creationDate: Number,
  endDate: Number,
  isBaseOrder: { type: Boolean },
});

export const Order = model('Order', OrderSchema);
