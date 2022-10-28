import { gql } from '@apollo/client';

export const getItemsQuery = gql`
  query getItems {
    GetItems {
      _id
      mathemId
      name
      productUrl
      productImageUrl
      isFavorite
    }
  }
`;
