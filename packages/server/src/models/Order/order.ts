import { Schema, model, SchemaTypes } from 'mongoose';
import { OrderDbObject } from 'src/generated/graphql';

export const OrderSchema = new Schema({
  status: {
    type: String,
    enum: ['PENDING', 'DELIVERED'],
    default: 'PENDING',
  },
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
  creationDate: Number,
  endDate: Number,
  isBaseOrder: Boolean,
});

export const Order = model<OrderDbObject>('Order', OrderSchema);
