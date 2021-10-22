import { OrderItem } from './OrderItem';

export type Order = {
  id: number;
  order_date: string;
  order_items: OrderItem[];
};
