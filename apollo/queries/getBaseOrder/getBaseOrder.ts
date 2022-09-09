import { gql } from '@apollo/client';

export const getBaseOrderQuery = gql`
  query getBaseOrder {
    GetBaseOrder {
      _id
      active
      items {
        _id
        name
        productUrl
        productImageUrl
        __typename
      }
    }
  }
`;
