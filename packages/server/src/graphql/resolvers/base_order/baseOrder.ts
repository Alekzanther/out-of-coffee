import { checkIfIdsAreValid } from '../../../helpers/helpers';
import {
  BaseOrder,
  BaseOrderResponse,
  Resolvers,
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
        return {
          __typename: 'BaseOrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'Unable to get BaseOrder',
          },
        };
      }

      const populatedBaseOrder: BaseOrder = await baseOrder.populate(
        'items',
      );
      return {
        __typename: 'BaseOrderResponse',
        data: [populatedBaseOrder],
        error: null,
      };
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
          return {
            __typename: 'BaseOrderResponse',
            data: null,
            error: {
              __typename: 'ErrorResponse',
              message: `Supplied ID ${invalidId} is not a valid ObjectId`,
            },
          };
        }

        const baseOrder = await BaseOrderModel.create({
          items: newBaseOrder?.items,
          active: newBaseOrder?.active,
        });

        if (!baseOrder) {
          return {
            __typename: 'BaseOrderResponse',
            data: null,
            error: {
              __typename: 'ErrorResponse',
              message: 'Unable to create BaseOrder',
            },
          };
        }

        const populatedBaseOrder: BaseOrder =
          await baseOrder.populate('items');

        return {
          __typename: 'BaseOrderResponse',
          data: [populatedBaseOrder],
          error: null,
        };
      } catch (error) {
        return {
          __typename: 'BaseOrderResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: `Error when trying to set BaseOrder: ${error}`,
          },
        };
      }
    },
  },
};
