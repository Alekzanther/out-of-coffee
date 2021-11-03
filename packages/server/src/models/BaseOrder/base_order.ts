import { model, Schema, SchemaTypes } from 'mongoose';
import { BaseOrderDbObject } from 'src/generated/graphql';

export const BaseOrderSchema = new Schema({
  items: [{ type: SchemaTypes.ObjectId, ref: 'Item' }],
  active: { type: SchemaTypes.Boolean },
});

export const BaseOrder = model<BaseOrderDbObject>(
  'BaseOrder',
  BaseOrderSchema,
);
