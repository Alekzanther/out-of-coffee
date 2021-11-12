import {
  Resolvers,
  BaseOrder,
  BaseOrderResponse,
} from '../../../generated/graphql';
import { BaseOrder as BaseOrderModel } from '../../../models/BaseOrder/base_order';

export const baseOrderResolver: Resolvers = {
  Query: {
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
