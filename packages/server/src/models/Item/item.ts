import { Schema, model } from 'mongoose';

export const ItemSchema = new Schema({
  name: String,
  productUrl: String,
  productImageUrl: String,
});

export const Item = model('Item', ItemSchema);
