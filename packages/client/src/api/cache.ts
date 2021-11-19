import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import { Order } from 'generated/graphql';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        order: {
          read() {
            return orderVar();
          },
        },
      },
    },
  },
});

const orderInitialValue: Order = {} as Order;

export const orderVar: ReactiveVar<Order> =
  makeVar<Order>(orderInitialValue);
