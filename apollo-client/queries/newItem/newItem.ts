import { gql } from '@apollo/client';

export const addItemMutation = gql`
  mutation AddNewItem($newItem: NewItem!) {
    CreateItem(newItem: $newItem) {
      name
      productUrl
    }
  }
`;
