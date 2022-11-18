import { gql } from '@apollo/client';

export const getBaseOrderQuery = gql`
  query getBaseOrder {
    getBaseOrder {
      _id
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
