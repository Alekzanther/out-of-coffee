import { Item, Resolvers, Order } from 'src/generated/graphql';
import { Item as ItemModel } from '../models/Item/item';
import { Order as OrderModel } from '../models/Order/order';

export const resolvers: Resolvers = {
  Query: {
    GetCurrentOrder: async (_, args): Promise<Order | null> => {
      const newOrder = (await OrderModel.findById(args.id).populate(
        'item',
      )) as Order;
      return newOrder;
    },
  },
  Mutation: {
    CreateItem: async (_, args): Promise<Item> => {
      const item = await ItemModel.create({
        name: args.name,
        productUrl: args.productUrl,
        productImageUrl: args.productImageUrl,
      });
      return item;
    },
  },
};
