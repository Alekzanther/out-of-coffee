import mongoose, { Schema, model } from 'mongoose';
import { ItemDbObject } from '../../generated/server-graphql';

export const ItemSchema = new Schema({
  name: String,
  productUrl: String,
  productImageUrl: String,
  isFavorite: Boolean,
});

export const Item =
  mongoose.models.Item || model<ItemDbObject>('Item', ItemSchema);
