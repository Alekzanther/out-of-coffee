import { checkIfIdsAreValid } from '../../../helpers/helpers';
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
      try {
        const currentBaseOrder = await BaseOrderModel.findOne({
          active: true,
        });

        if (currentBaseOrder) {
          await currentBaseOrder.updateOne(
            { _id: currentBaseOrder._id },
            { active: false },
          );
        }

        const invalidId = checkIfIdsAreValid(
          newBaseOrder.items as string[],
        );
        if (invalidId) {
          const response: BaseOrderResponse = {
            data: null,
            error: {
              message: `Supplied ID ${invalidId} is not a valid ObjectId`,
            },
          };
          return response;
        }

        const baseOrder = await BaseOrderModel.create({
          items: newBaseOrder?.items,
          active: newBaseOrder?.active,
        });

        if (!baseOrder) {
          const response: BaseOrderResponse = {
            data: null,
            error: {
              message: 'Unable to create BaseOrder',
            },
          };
          return response;
        }

        const populatedBaseOrder: BaseOrder =
          await baseOrder.populate('items');

        const response: BaseOrderResponse = {
          data: [populatedBaseOrder],
          error: null,
        };

        return response;
      } catch (error) {
        const response: BaseOrderResponse = {
          data: null,
          error: {
            message: `Error when trying to set BaseOrder: ${error}`,
          },
        };
        return response;
      }
    },
  },
};
