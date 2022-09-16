import mongoose, { Schema, model, SchemaTypes } from 'mongoose';

export const OrderSchema = new Schema({
  status: {
    type: String,
    enum: ['PENDING', 'DELIVERED'],
    default: 'PENDING',
  },
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
  creationDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  isBaseOrder: Boolean,
});

export const Order =
  mongoose.models.Order || model<any>('Order', OrderSchema);
