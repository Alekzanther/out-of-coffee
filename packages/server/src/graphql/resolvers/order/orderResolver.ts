import { isValidObjectId } from 'mongoose';
import { checkIfIdsAreValid } from '../../../helpers/helpers';
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
        return {
          __typename: 'OrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'Unable to fetch orders',
          },
        };
      }

      return {
        __typename: 'OrderResponse',
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
          __typename: 'OrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'Unable to find order with supplied ID',
          },
        };
      }

      return {
        __typename: 'OrderResponse',
        data: [order],
        error: null,
      };
    },
    GetOrder: async (_, { id }): Promise<OrderResponse> => {
      const isIdValid = isValidObjectId(id);
      if (!isIdValid) {
        return {
          __typename: 'OrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'Supplied ID is not a valid MongoDb ObjectId',
          },
        };
      }

      const order = await OrderModel.findById(id);

      if (!order) {
        return {
          __typename: 'OrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'No order found with supplied ID.',
          },
        };
      }

      const populatedOrder: Order = await order.populate('items');

      return {
        __typename: 'OrderResponse',
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
            __typename: 'OrderResponse',
            data: null,
            error: {
              __typename: 'ErrorResponse',
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
            __typename: 'OrderResponse',
            data: null,
            error: {
              __typename: 'ErrorResponse',
              message: 'Unable to save new order',
            },
          };
        }

        const populatedOrder: Order = await order.populate('items');

        return {
          __typename: 'OrderResponse',
          data: [populatedOrder],
          error: null,
        };
      } catch (error) {
        return {
          __typename: 'OrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: `Unable to save new order: ${error}`,
          },
        };
      }
    },
  },
};
