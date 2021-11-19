import {isValidObjectId} from 'mongoose';
import {checkIfIdsAreValid} from '../../../helpers/helpers';
import {Order, OrderResponse, OrderStatus, Resolvers,} from '../../../generated/graphql';
import {Order as OrderModel} from '../../../models/Order/order';

export const orderResolver: Resolvers = {
  Query: {
    GetOrders: async (): Promise<OrderResponse> => {
      const orders: Order[] = await OrderModel.find().populate(
        'items',
      );

      if (!orders) {
        return {
          data: null,
          error: {
            message: 'Unable to fetch orders',
          },
        };
      }

      return {
        data: orders,
        error: null,
      };
    },
    GetCurrentOrder: async (_, { id }): Promise<OrderResponse> => {
      const order = (await OrderModel.findById(id).populate(
        'items',
      )) as Order;

      if (!order) {
        return {
          data: null,
          error: {
            message: 'Unable to find order with supplied ID',
          },
        };
      }

      return {
        data: [order],
        error: null,
      };
    },
    GetOrder: async (_, { id }): Promise<OrderResponse> => {
      const isIdValid = isValidObjectId(id);
      if (!isIdValid) {
        return {
          data: null,
          error: {
            message: 'Supplied ID is not a valid MongoDb ObjectId',
          },
        };
      }

      const order = await OrderModel.findById(id);

      if (!order) {
        return {
          data: null,
          error: {
            message: 'No order found with supplied ID.',
          },
        };
      }

      const populatedOrder: Order = await order.populate('items');

      return {
        data: [populatedOrder],
        error: null,
      };
    },
  },
  Mutation: {
    CreateOrder: async (_, { newOrder }): Promise<OrderResponse> => {
      try {
        const invalidId = checkIfIdsAreValid(
          newOrder.items as string[],
        );
        if (invalidId) {
          return {
            data: null,
            error: {
              message: `Supplied ID ${invalidId} is not a valid ObjectId`,
            },
          };
        }

        const order = await OrderModel.create({
          status: OrderStatus.Pending,
          items: newOrder?.items,
          creationDate: Date.now(),
          endDate: Date.now() + 604800000, // Date now + 1 week.
          processed: false,
        });

        if (!order) {
          return {
            data: null,
            error: {
              message: 'Unable to save new order',
            },
          };
        }

        const populatedOrder: Order = await order.populate('items');

        return {
          data: [populatedOrder],
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: {
            message: `Unable to save new order: ${error}`,
          },
        };
      }
    },
  },
};
