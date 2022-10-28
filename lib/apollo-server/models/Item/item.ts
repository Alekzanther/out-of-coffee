import mongoose, { Schema, model } from 'mongoose';

export const ItemSchema = new Schema({
  mathemId: String,
  name: String,
  productUrl: String,
  productImageUrl: String,
  isFavorite: Boolean,
});

export const Item =
  mongoose.models.Item || model<any>('Item', ItemSchema);
