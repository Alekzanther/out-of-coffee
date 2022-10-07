import { Item } from '../apollo-generated/client-graphql';

type AggregatedItem = {
  productUrl: string;
  productImageUrl?: string | null;
  _id: string;
  amount: number;
  name: string;
};

export const aggregateItems = (items: Item[]) =>
  items.reduce((newItems, next) => {
    const duplicateExists = newItems.find(
      (item) => item._id === next._id,
    );

    if (duplicateExists) {
      return newItems.map((item) => {
        return item._id === next._id
          ? { ...item, amount: item.amount + 1 }
          : item;
      });
    } else {
      return [...newItems, { ...next, amount: 1 }];
    }
  }, [] as AggregatedItem[]);
