import mongoose, { model, Schema, SchemaTypes } from 'mongoose';

export const BaseOrderSchema = new Schema({
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
  active: { type: SchemaTypes.Boolean },
});

export const BaseOrder =
  mongoose.models.BaseOrder ||
  model<any>('BaseOrder', BaseOrderSchema);
