import { Resolvers } from '@apollo/client';
import { isValidObjectId } from 'mongoose';
import { checkIfIdsAreValid } from '../../../../helpers/helpers';
import { Order as OrderModel } from '../../models/Order/order';

import { Order } from '../../../../apollo-generated/server-graphql';

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
    GetOrder: async (_, { id }): Promise<Order> => {
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
    CreateOrder: async (_, { newOrder }): Promise<Order> => {
      try {
        const invalidId = checkIfIdsAreValid(
          newOrder.items as string[],
        );

        if (invalidId) {
          throw new Error(
            `Supplied ID ${invalidId} is not a valid ObjectId`,
          );
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
    AddItemToOrder: async (_, { item }): Promise<Order> => {
      try {
        const order: Order[] = await OrderModel.findOneAndUpdate(
          {
            status: 'PENDING',
          },
          {
            $push: { items: item },
          },
          { new: true },
        ).populate('items');

        if (!order) {
          throw new Error('Could not find the current order');
        }
        // TODO: Fix this monstrosity of selection. I don't think pending can be unique in theory (but in practice)
        // or findOneAndUpdate always returns an array now? Idk
        return order[0];
      } catch (error) {
        throw new Error(`Unable to save new order: ${error}`);
      }
    },
    RemoveItemFromOrder: async (_, { item }): Promise<Order> => {
      try {
        const order = await OrderModel.findOne({
          status: 'PENDING',
        }).lean();

        if (order) {
          const itemIndex = order.items.findIndex(
            (i) => i.toString() === item,
          );

          if (itemIndex !== undefined && itemIndex > -1) {
            order.items.splice(itemIndex, 1);
          }

          const newOrder: Order[] = await OrderModel.findOneAndUpdate(
            {
              status: 'PENDING',
            },
            order,
            { new: true },
          ).populate('items');
          // TODO: Fix this monstrosity of selection. I don't think pending can be unique in theory (but in practice)
          // or findOneAndUpdate always returns an array now? Idk
          return newOrder[0];
        }

        console.log('updatedOrder', order);
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
