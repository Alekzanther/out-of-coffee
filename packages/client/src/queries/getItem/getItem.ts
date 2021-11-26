import { gql } from '@apollo/client';

export const getItemQuery = gql`
  query getItem($id: ID!) {
    GetItem(id: $id) {
      name
      productUrl
      productImageUrl
    }
  }
`;
