import { Item } from 'generated/graphql';
import {
  ExtendedItem,
  getAmountOfItemsInOrder,
} from './getAmountOfItemsInOrder';

describe('getAmountOfItemsInOrder', () => {
  test('should count all duplicate items', () => {
    const items: Item[] = [
      {
        __typename: 'Item',
        _id: '1',
        isFavorite: false,
        name: 'Banan',
        productImageUrl: null,
        productUrl: 'something',
      },
      {
        __typename: 'Item',
        _id: '1',
        isFavorite: false,
        name: 'Banan',
        productImageUrl: null,
        productUrl: 'something',
      },
      {
        __typename: 'Item',
        _id: '2',
        isFavorite: false,
        name: 'Not a Banan',
        productImageUrl: null,
        productUrl: 'something',
      },
    ];
    const futureActualItems: ExtendedItem[] = [
      {
        __typename: 'Item',
        _id: '1',
        isFavorite: false,
        name: 'Banan',
        productImageUrl: null,
        productUrl: 'something',
        amount: 2,
      },
      {
        __typename: 'Item',
        _id: '2',
        isFavorite: false,
        name: 'Not a Banan',
        productImageUrl: null,
        productUrl: 'something',
        amount: 1,
      },
    ];
    const actualItems = getAmountOfItemsInOrder(items);
    expect(actualItems).toEqual(futureActualItems);
  });
});
