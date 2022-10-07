import { Item } from '../apollo-generated/client-graphql';

export type ExtendedItem = Item & {
  amount: number;
};

export const getAmountOfItemsInOrder = (items?: Item[]) => {
  if (items) {
    return items.reduce((acc, next) => {
      if (next) {
        const extendedNext: ExtendedItem = { ...next, amount: 1 };

        const existingItemIndex = acc.findIndex(
          (item) => item._id === next?._id,
        );

        if (existingItemIndex > -1) {
          acc[existingItemIndex].amount += 1;
          return [...acc];
        }
        return [...acc, extendedNext];
      }
      return acc;
    }, [] as ExtendedItem[]);
  }
  return [];
};
