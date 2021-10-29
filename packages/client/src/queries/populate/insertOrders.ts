import { gql } from '@apollo/client/core';

export const insertOrdersMutation = gql`
  mutation InsertOrders($objects: [orders_insert_input]!) {
    insert_orders(objects: $objects) {
      affected_rows
    }
  }
`;
