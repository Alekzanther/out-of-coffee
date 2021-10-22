import { Orders } from '../models/Orders/orders';

export const resolvers = {
  Query: {
    GetCurrentOrder: async () => {
      await Orders.find();
    },
  },
};
