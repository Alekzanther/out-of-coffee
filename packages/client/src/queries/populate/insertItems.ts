import { gql } from '@apollo/client/core';

export const insertItemMutation = gql`
  mutation InsertItems($objects: [items_insert_input]!) {
    insert_items(objects: $objects) {
      affected_rows
    }
  }
`;
