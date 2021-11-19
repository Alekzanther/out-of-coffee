import { gql } from '@apollo/client';

export const getItemsQuery = gql`
  query getItems {
    GetItems {
      data {
        _id
        name
        productUrl
        productImageUrl
      }
    }
  }
`;
