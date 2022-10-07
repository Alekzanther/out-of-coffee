import { Item } from '../apollo-generated/client-graphql';
import { aggregateItems } from './aggregateItems';

describe('aggregateItems()', () => {
  it('should return stuff', () => {
    const items = [
      {
        _id: '1',
        name: 'Start',
        productUrl: 'url',
        productImageUrl: 'imageurl',
      },
      {
        _id: '1',
        name: 'Start',
        productUrl: 'url',
        productImageUrl: 'imageurl',
      },
      {
        _id: '2',
        name: 'Start',
        productUrl: 'url',
        productImageUrl: 'imageurl',
      },
    ] as Item[];
    const result = [
      {
        _id: '1',
        name: 'Start',
        productUrl: 'url',
        productImageUrl: 'imageurl',
        amount: 2,
      },
      {
        _id: '2',
        name: 'Start',
        productUrl: 'url',
        productImageUrl: 'imageurl',
        amount: 1,
      },
    ];
    expect(aggregateItems(items)).toEqual(result);
  });
});
