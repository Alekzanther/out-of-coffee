import { isValidObjectId } from 'mongoose';
import {
  Order,
  OrderResponse,
  OrderStatus,
  Resolvers,
} from '../../../generated/graphql';
import { Order as OrderModel } from '../../../models/Order/order';

export const orderResolver: Resolvers = {
  Query: {
    GetOrders: async (): Promise<OrderResponse> => {
      const orders: Order[] = await OrderModel.find().populate(
        'items',
      );

      if (!orders) {
        const response: OrderResponse = {
          data: null,
          error: {
            message: 'Unable to fetch orders',
          },
        };
        return response;
      }

      const response: OrderResponse = {
        data: orders,
        error: null,
      };

      return response;
    },
    GetCurrentOrder: async (_, { id }): Promise<OrderResponse> => {
      const order = (await OrderModel.findById(id).populate(
        'items',
      )) as Order;

      if (!order) {
        const response: OrderResponse = {
          data: null,
          error: {
            message: 'Unable to find order with supplied ID',
          },
        };
        return response;
      }

      const response: OrderResponse = {
        data: [order],
        error: null,
      };

      return response;
    },
    GetOrder: async (_, { id }): Promise<OrderResponse> => {
      const isIdValid = isValidObjectId(id);
      if (!isIdValid) {
        const response: OrderResponse = {
          data: null,
          error: {
            message: 'Supplied ID is not a valid MongoDb ObjectId',
          },
        };
        return response;
      }

      const order = await OrderModel.findById(id);

      if (!order) {
        const response: OrderResponse = {
          data: null,
          error: {
            message: 'No order found with supplied ID.',
          },
        };
        return response;
      }

      const populatedOrder: Order = await order.populate('items');

      const response: OrderResponse = {
        data: [populatedOrder],
        error: null,
      };
      return response;
    },
  },
  Mutation: {
    CreateOrder: async (_, { newOrder }): Promise<OrderResponse> => {
      const order = await OrderModel.create({
        status: OrderStatus.Pending,
        items: newOrder?.items,
        creationDate: Date.now(), // TODO: Too large int for graphql, update dates to strings?
        endDate: Date.now() + 604800000, // Date now + 1 week.
        processed: false,
      });

      if (!order) {
        const response: OrderResponse = {
          data: null,
          error: {
            message: 'Unable to save new order',
          },
        };
        return response;
      }

      const populatedOrder: Order = await order.populate('items');

      const response: OrderResponse = {
        data: [populatedOrder],
        error: null,
      };

      return response;
    },
  },
};
