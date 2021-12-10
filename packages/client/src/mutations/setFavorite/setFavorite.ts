import { gql } from '@apollo/client';

export const setFavoriteMutation = gql`
  mutation setFavorite($id: ID!) {
    SetFavorite(id: $id)
  }
`;
