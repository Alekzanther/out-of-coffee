import { isValidObjectId } from 'mongoose';
import {
  Resolvers,
  Order,
  BaseOrder,
  ItemResponse,
  OrderResponse,
  BaseOrderResponse,
} from '../generated/graphql';
import { scrapeProductUrl } from '../scraper';
import { BaseOrder as BaseOrderModel } from '../models/BaseOrder/base_order';
import { Item as ItemModel } from '../models/Item/item';
import { Order as OrderModel } from '../models/Order/order';

export const resolvers: Resolvers = {
  Query: {
    GetOrders: async (): Promise<OrderResponse> => {
      const orders = await OrderModel.find().populate('items');

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

      const order = await OrderModel.findById(id).populate('items');

      if (!order) {
        const response: OrderResponse = {
          data: null,
          error: {
            message: 'No order found with supplied ID.',
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
    GetItems: async (): Promise<ItemResponse> => {
      const items = await ItemModel.find();
      const response: ItemResponse = {
        __typename: 'ItemResponse',
        data: items,
        error: null,
      };
      return response;
    },
    GetItem: async (_, { id }): Promise<ItemResponse> => {
      const isIdValid = isValidObjectId(id);

      if (!isIdValid) {
        const response: ItemResponse = {
          data: null,
          error: {
            message: 'Supplied ID is not a valid MongoDb ObjectId',
          },
        };
        return response;
      }

      const item = await ItemModel.findById(id);
      if (!item) {
        const response: ItemResponse = {
          data: null,
          error: {
            message: 'No item found with supplied ID.',
          },
        };
        return response;
      }
      const response: ItemResponse = {
        data: [item],
        error: null,
      };
      return response;
    },
    // TODO: Base order should maybe be unique?
    GetBaseOrder: async (): Promise<BaseOrderResponse> => {
      const baseOrder = await BaseOrderModel.findOne({
        active: true,
      });

      if (!baseOrder) {
        const response: BaseOrderResponse = {
          data: null,
          error: {
            message: 'Unable to get BaseOrder',
          },
        };
        return response;
      }

      const populatedBaseOrder: BaseOrder = await baseOrder.populate(
        'items',
      );
      const response: BaseOrderResponse = {
        data: [populatedBaseOrder],
        error: null,
      };

      return response;
    },
  },
  Mutation: {
    CreateItem: async (_, { newItem }): Promise<ItemResponse> => {
      const productImageUrl = await scrapeProductUrl(
        newItem.productUrl,
      );

      if (!productImageUrl) {
        const response: ItemResponse = {
          data: null,
          error: {
            message:
              'Unable to fetch productImage from supplied product URL',
          },
        };
        return response;
      }
      const item = await ItemModel.create({
        name: newItem?.name,
        productUrl: newItem?.productUrl,
        productImageUrl,
      });

      const response: ItemResponse = {
        data: [item],
        error: null,
      };
      return response;
    },

    CreateOrder: async (_, { newOrder }): Promise<OrderResponse> => {
      const order = await OrderModel.create({
        status: 'pending',
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

    SetBaseOrder: async (
      _,
      { newBaseOrder },
    ): Promise<BaseOrderResponse> => {
      const currentBaseOrder = await BaseOrderModel.findOne({
        active: true,
      });

      if (!currentBaseOrder) {
        const response: BaseOrderResponse = {
          data: null,
          error: {
            message: 'No current BaseOrder found',
          },
        };
        return response;
      }

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

      const populatedBaseOrder: BaseOrder = await baseOrder.populate(
        'items',
      );

      const response: BaseOrderResponse = {
        data: [populatedBaseOrder],
        error: null,
      };

      return response;
    },
  },
};
