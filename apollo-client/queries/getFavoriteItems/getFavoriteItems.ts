import { gql } from '@apollo/client';

export const getFavoriteItemsQuery = gql`
  query getFavoriteItems {
    GetFavoriteItems {
      _id
      name
      productUrl
      productImageUrl
      isFavorite
    }
  }
`;
