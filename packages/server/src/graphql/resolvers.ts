import {
  Item,
  Resolvers,
  Order,
  QueryResolvers,
  MutationResolvers,
} from 'src/generated/graphql';
import { Item as ItemModel } from 'src/models/Item/item';
import { Order as OrderModel } from '../models/Order/order';

const Query: QueryResolvers = {
  GetCurrentOrder: async (_, args): Promise<Order | null> => {
    const newOrder = (await OrderModel.findById(args.id).populate(
      'item',
    )) as Order;
    return newOrder;
  },
};

const Mutation: MutationResolvers = {
  CreateItem: async (_, args): Promise<Item> => {
    const item = await ItemModel.create({
      name: args.name,
      productUrl: args.productUrl,
      productImageUrl: args.productImageUrl,
    });

    return item;
  },
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
