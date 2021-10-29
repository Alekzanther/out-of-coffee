import { model, Schema, SchemaTypes } from 'mongoose';
import { BaseOrderDbObject } from 'src/generated/graphql';

export const BaseOrderSchema = new Schema({
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
});

export const BaseOrder = model<BaseOrderDbObject>(
  'BaseOrder',
  BaseOrderSchema,
);
