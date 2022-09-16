import { Item } from './models/Item/item';

export const resolvers = {
  Query: {
    GetItems: async () => {
      const items = await Item.find();
      return items;
    },
  },
};
