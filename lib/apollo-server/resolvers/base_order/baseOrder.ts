import { Resolvers } from '@apollo/client';
import { checkIfIdsAreValid } from '../../../../helpers/helpers';

import { BaseOrder as BaseOrderModel } from '../../models/BaseOrder/base_order';

import { BaseOrder } from '../../../../apollo-generated/server-graphql';

export const baseOrderResolver: Resolvers = {
  Query: {
    getBaseOrder: async (): Promise<BaseOrder> => {
      const baseOrders = await BaseOrderModel.find().orFail();

      const baseOrder = baseOrders[0];

      const populatedBaseOrder: BaseOrder = await baseOrder.populate(
        'items',
      );
      return populatedBaseOrder;
    },
  },
  Mutation: {
    setBaseOrder: async (_, { newBaseOrder }): Promise<BaseOrder> => {
      try {
        const invalidId = checkIfIdsAreValid(
          newBaseOrder.items as string[],
        );

        if (invalidId) {
          throw new Error(
            `Supplied ID ${invalidId} is not a valid ObjectId`,
          );
        }

        if (!newBaseOrder.items) throw new Error('No items supplied');

        const currentBaseOrders =
          await BaseOrderModel.find().orFail();

        const currentBaseOrder = currentBaseOrders[0];
        await currentBaseOrder.updateOne({
          _id: currentBaseOrder._id,
          items: newBaseOrder.items,
        });

        const baseOrder = await BaseOrderModel.create({
          items: newBaseOrder?.items,
        });

        if (!baseOrder) {
          throw new Error('Unable to create BaseOrder');
        }

        const populatedBaseOrder: BaseOrder =
          await baseOrder.populate('items');

        return populatedBaseOrder;
      } catch (error) {
        throw new Error(
          `Error when trying to set BaseOrder: ${error}`,
        );
      }
    },
  },
};
