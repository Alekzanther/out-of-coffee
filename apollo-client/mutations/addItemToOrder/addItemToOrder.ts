import { gql } from '@apollo/client';
import { orderFragment } from '../../fragments/Order';

export const addItemToOrderMutation = gql`
  mutation addItemToOrder($id: String!) {
    AddItemToOrder(id: $id) {
      ...OrderFragment
    }
    ${orderFragment}
  }
`;
