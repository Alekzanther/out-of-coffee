import { gql } from '@apollo/client';

export const getOrdersQuery = gql`
  query getOrders {
    GetOrders {
      data {
        _id
        status
        items {
          _id
          name
          productUrl
          productImageUrl
          __typename
        }
        creationDate
        endDate
        __typename
      }
    }
  }
`;
