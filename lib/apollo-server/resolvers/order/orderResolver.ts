import { Resolvers } from '@apollo/client';
import { isValidObjectId } from 'mongoose';
import { checkIfIdsAreValid } from '../../../../helpers/helpers';
import { Order as OrderModel } from '../../models/Order/order';
import { Item as ItemModel } from '../../models/Item/item';

import {
  Item,
  MutationAddItemToOrderArgs,
  MutationRemoveItemFromOrderArgs,
  NewOrder,
  Order,
  QueryGetOrderArgs,
} from '../../../../apollo-generated/server-graphql';

enum StatusOrder {
  Pending = 'PENDING',
}

export const orderResolver: Resolvers = {
  Query: {
    GetOrders: async (): Promise<Order[]> => {
      try {
        const orders: Order[] = await OrderModel.find().populate(
          'items',
        );

        if (!orders || orders.length === 0) {
          throw new Error('No orders found');
        }

        return orders;
      } catch (error) {
        throw new Error('No Orders');
      }
    },
    GetCurrentOrder: async (): Promise<Order> => {
      const order: Order[] = await OrderModel.find({
        status: 'PENDING',
      }).populate('items');

      if (!order) {
        throw new Error('No order');
      }
      // TODO: Fix this monstrosity of selection. I don't think pending can be unique in theory (but in practice)
      // or findOneAndUpdate always returns an array now? Idk
      return order[0];
    },
    GetOrder: async (
      _,
      { id }: QueryGetOrderArgs,
    ): Promise<Order> => {
      const isIdValid = isValidObjectId(id);
      if (!isIdValid) {
        throw new Error(
          'Supplied ID is not a valid MongoDb ObjectId',
        );
      }

      const order = await OrderModel.findById(id);

      if (!order) {
        throw new Error('No order found with supplied ID.');
      }

      const populatedOrder: Order = await order.populate('items');

      return populatedOrder;
    },
  },
  Mutation: {
    CreateOrder: async (
      _,
      { newOrder }: { newOrder: NewOrder },
    ): Promise<Order> => {
      try {
        const invalidId = checkIfIdsAreValid(
          newOrder.items as string[],
        );

        if (invalidId) {
          throw new Error(
            `Supplied ID ${invalidId} is not a valid ObjectId`,
          );
        }

        try {
          const currentOrder = await OrderModel.find({
            status: 'PENDING',
          });
          if (currentOrder) {
            throw new Error('A pending order already exists');
          }
        } catch (error) {
          throw new Error(`Could not find order: ${error}`);
        }

        const order = await OrderModel.create({
          status: StatusOrder.Pending,
          items: newOrder?.items,
          creationDate: Date.now(),
          endDate: Date.now() + 604800000, // Date now + 1 week.
          processed: false,
        });

        if (!order) {
          throw new Error('Unable to save new order');
        }

        const populatedOrder: Order = await order.populate('items');

        return populatedOrder;
      } catch (error) {
        throw new Error(`Unable to save new order: ${error}`);
      }
    },
    AddItemToOrder: async (
      _,
      { item }: MutationAddItemToOrderArgs,
    ): Promise<Order> => {
      try {
        const existingItem: Item = await ItemModel.findOne({
          mathemId: item.mathemId,
        });

        const newItem = existingItem
          ? null
          : await ItemModel.create(item);

        const order = (await OrderModel.findOneAndUpdate(
          {
            status: 'PENDING',
          },
          {
            $push: {
              items: existingItem ? existingItem._id : newItem.id,
            },
          },
          { new: true },
        ).populate('items')) as Order;

        if (!order) {
          throw new Error('Could not find the current order');
        }

        return order;
      } catch (error) {
        throw new Error(`Unable to save new order: ${error}`);
      }
    },
    RemoveItemFromOrder: async (
      _,
      { id }: MutationRemoveItemFromOrderArgs,
    ): Promise<Order> => {
      try {
        const order = await OrderModel.findOne({
          status: 'PENDING',
        }).lean();

        if (order) {
          const itemIndex = order.items.findIndex(
            (i) => i.toString() === id,
          );

          if (itemIndex !== undefined && itemIndex > -1) {
            order.items.splice(itemIndex, 1);
          }

          const newOrder = (await OrderModel.findOneAndUpdate(
            {
              status: 'PENDING',
            },
            order,
            { new: true },
          ).populate('items')) as Order;
          return newOrder;
        }

        if (!order) {
          throw new Error('Could not find the current order');
        }
        return order;
      } catch (error) {
        throw new Error(`Unable to save new order: ${error}`);
      }
    },
  },
};
