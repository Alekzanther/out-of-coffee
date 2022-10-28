import { gql } from '@apollo/client';

export const getItemQuery = gql`
  query getItem($id: ID!) {
    GetItem(id: $id) {
      mathemId
      name
      productUrl
      productImageUrl
      isFavorite
    }
  }
`;
