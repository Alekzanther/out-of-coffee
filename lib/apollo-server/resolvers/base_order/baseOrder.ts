import { Resolvers } from '@apollo/client';
import { checkIfIdsAreValid } from '../../../../helpers/helpers';

import { BaseOrder as BaseOrderModel } from '../../models/BaseOrder/base_order';

export const baseOrderResolver: Resolvers = {
  Query: {
    // TODO: Base order should maybe be unique?
    GetBaseOrder: async () => {
      const baseOrder = await BaseOrderModel.findOne({
        active: true,
      });

      if (!baseOrder) {
        throw new Error('Unable to get BaseOrder');
      }

      const populatedBaseOrder: any = await baseOrder.populate(
        'items',
      );
      return populatedBaseOrder;
    },
  },
  Mutation: {
    SetBaseOrder: async (_, { newBaseOrder }) => {
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
          throw new Error(
            `Supplied ID ${invalidId} is not a valid ObjectId`,
          );
        }

        const baseOrder = await BaseOrderModel.create({
          items: newBaseOrder?.items,
          active: newBaseOrder?.active,
        });

        if (!baseOrder) {
          throw new Error('Unable to create BaseOrder');
        }

        const populatedBaseOrder: any = await baseOrder.populate(
          'items',
        );

        return populatedBaseOrder;
      } catch (error) {
        throw new Error(
          `Error when trying to set BaseOrder: ${error}`,
        );
      }
    },
  },
};
