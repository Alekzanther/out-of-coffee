import { isValidObjectId } from 'mongoose';
import { checkIfIdsAreValid } from '../../../helpers/helpers';
import {
  Order,
  OrderStatus,
  Resolvers,
} from '../../../generated/graphql';
import { Order as OrderModel } from '../../../models/Order/order';

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
    GetCurrentOrder: async (_, { id }): Promise<Order> => {
      const order = (await OrderModel.findById(id).populate(
        'items',
      )) as Order;

      if (!order) {
        throw new Error('No order');
      }

      return order;
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
          status: OrderStatus.Pending,
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
        const order: Order = await OrderModel.findOneAndUpdate(
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

        return order;
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

          const newOrder: Order = await OrderModel.findOneAndUpdate(
            {
              status: 'PENDING',
            },
            order,
            { new: true },
          ).populate('items');
          return newOrder;
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
