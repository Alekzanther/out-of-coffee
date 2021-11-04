import { isValidObjectId } from 'mongoose';
import {
  Item,
  Resolvers,
  Order,
  BaseOrder,
} from '../generated/graphql';
import { scrapeProductUrl } from '../scraper';
import { BaseOrder as BaseOrderModel } from '../models/BaseOrder/base_order';
import { Item as ItemModel } from '../models/Item/item';
import { Order as OrderModel } from '../models/Order/order';

export const resolvers: Resolvers = {
  Response: {
    __resolveType(obj) {
      switch (obj.__typename) {
        case 'ErrorResponse':
          return 'ErrorResponse';
        case 'Item':
          return 'Item';
        case 'BaseOrder':
          return 'BaseOrder';
        case 'Order':
          return 'Order';
        default:
          return null;
      }
    },
  },
  Query: {
    GetOrders: async (): Promise<Order[]> => {
      return await OrderModel.find().populate('items');
    },
    GetCurrentOrder: async (_, { id }): Promise<Order | null> => {
      const newOrder = (await OrderModel.findById(id).populate(
        'items',
      )) as Order;

      if (!newOrder) {
        return null;
      }
      return newOrder;
    },
    GetOrder: async (_, { id }): Promise<Order | null> => {
      const isIdValid = isValidObjectId(id);
      // This could be replaced by an error message instead
      if (!isIdValid) {
        return null;
      }
      const order = await OrderModel.findById(id).populate('items');
      if (!order) {
        return null;
      }
      return order as Order;
    },
    GetItems: async (): Promise<Item[]> => {
      return await ItemModel.find();
    },
    GetItem: async (_, { id }): Promise<Item | null> => {
      const isIdValid = isValidObjectId(id);
      // This could be replaced by an error message instead
      if (!isIdValid) {
        return null;
      }
      const item = await ItemModel.findById(id);
      if (!item) {
        return null;
      }
      return item;
    },
    // TODO: Base order should maybe be unique?
    GetBaseOrder: async (): Promise<BaseOrder | null> => {
      return await BaseOrderModel.findOne({ active: true }).populate(
        'items',
      );
    },
  },
  Mutation: {
    CreateItem: async (_, { newItem }): Promise<Item | null> => {
      const productImageUrl = await scrapeProductUrl(
        newItem.productUrl,
      );

      if (!productImageUrl) {
        // Can replace with error message instead
        return null;
      }
      const item = await ItemModel.create({
        name: newItem?.name,
        productUrl: newItem?.productUrl,
        productImageUrl,
      });
      return item;
    },

    CreateOrder: async (_, { newOrder }): Promise<Order> => {
      const order = await OrderModel.create({
        status: 'pending',
        items: newOrder?.items,
        creationDate: Date.now(), // TODO: Too large int for graphql, update dates to strings?
        endDate: Date.now() + 604800000, // Date now + 1 week.
        processed: false,
      });

      return order.populate('items');
    },

    SetBaseOrder: async (_, { newBaseOrder }): Promise<BaseOrder> => {
      const currentBaseOrder = await BaseOrderModel.findOne({
        active: true,
      });

      if (currentBaseOrder) {
        await currentBaseOrder.updateOne(
          { _id: currentBaseOrder._id },
          { active: false },
        );
      }

      const baseOrder = await BaseOrderModel.create({
        items: newBaseOrder?.items,
        active: newBaseOrder?.active,
      });

      return baseOrder.populate('items');
    },
  },
};
