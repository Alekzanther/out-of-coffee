import { Order, OrderStatus } from 'generated/graphql';
import { getLatestOrder } from './getLatestOrder';

describe('getLatestOrder', () => {
  test('should sort descending', () => {
    const firstOrder: Order = {
      __typename: 'Order',
      _id: '1234',
      creationDate: 2,
      endDate: 123,
      status: OrderStatus.Pending,
      items: [],
    };
    const secondOrder: Order = {
      __typename: 'Order',
      _id: '5678',
      creationDate: 2,
      endDate: 456,
      status: OrderStatus.Pending,
      items: [],
    };
    const thirdOrder: Order = {
      __typename: 'Order',
      _id: '5678',
      creationDate: 2,
      endDate: 789,
      status: OrderStatus.Pending,
      items: [],
    };
    const sorted = getLatestOrder([
      firstOrder,
      thirdOrder,
      secondOrder,
    ]);
    expect(sorted[0]).toBe(thirdOrder);
  });
});
