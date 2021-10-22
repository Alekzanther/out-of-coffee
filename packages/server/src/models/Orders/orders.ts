import { Schema, model } from 'mongoose';

export const OrdersSchema = new Schema({
  product: String,
});

export const Orders = model('Orders', OrdersSchema);
