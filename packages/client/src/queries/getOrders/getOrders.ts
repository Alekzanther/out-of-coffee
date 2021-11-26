import { gql } from '@apollo/client';

const itemFragment = gql`
  fragment ItemFragment on Item {
    _id
    name
    productUrl
    productImageUrl
    __typename
  }
`;

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
