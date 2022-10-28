import { gql } from '@apollo/client';

export const getCurrentOrderQuery = gql`
  query getCurrentOrder {
    GetCurrentOrder {
      _id
      status
      creationDate
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
