import { Order } from '../models/Order/order';

export const resolvers = {
  Query: {
    GetCurrentOrder: async () => {
      await Order.find();
    },
  },
};
