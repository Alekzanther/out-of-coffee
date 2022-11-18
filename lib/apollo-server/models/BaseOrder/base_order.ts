import { model, Schema, Types } from 'mongoose';

interface BaseOrder {
  items: Types.ObjectId[];
}

const baseOrderSchema = new Schema<BaseOrder>({
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

export const BaseOrder = model<BaseOrder>(
  'BaseOrder',
  baseOrderSchema,
);
