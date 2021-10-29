import { model, Schema, SchemaTypes } from 'mongoose';

export const BaseOrderSchema = new Schema({
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
});

export const BaseOrder = model('BaseOrder', BaseOrderSchema);
