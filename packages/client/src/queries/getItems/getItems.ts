import { gql } from '@apollo/client';

export const getItemsQuery = gql`
  query getItems {
    GetItems {
      data {
        name
        productUrl
        productImageUrl
      }
    }
  }
`;
