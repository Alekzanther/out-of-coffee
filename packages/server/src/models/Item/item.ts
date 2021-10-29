import { Schema, model } from 'mongoose';
import { ItemDbObject } from 'src/generated/graphql';

export const ItemSchema = new Schema({
  name: String,
  productUrl: String,
  productImageUrl: String,
});

export const Item = model<ItemDbObject>('Item', ItemSchema);
