import { gql } from '@apollo/client';
import { itemFragment } from '../../fragments/Item';

export const getOrdersQuery = gql`
  query getOrders {
    GetOrders {
      _id
      status
      items {
        ...ItemFragment
      }
      creationDate
      endDate
      __typename
    }
  }
  ${itemFragment}
`;
