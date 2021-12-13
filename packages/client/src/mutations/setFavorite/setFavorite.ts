import { gql } from '@apollo/client';

export const setFavoriteMutation = gql`
  mutation setFavorite($id: ID!, $value: Boolean) {
    SetFavorite(id: $id, value: $value) {
      _id
      name
      isFavorite
      productUrl
      productImageUrl
    }
  }
`;
