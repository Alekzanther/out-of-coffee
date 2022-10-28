import { gql } from '@apollo/client';
import { orderFragment } from '../../fragments/Order';

export const removeItemFromOrderMutation = gql`
  mutation removeItemFromOrder($id: String!) {
    RemoveItemFromOrder(id: $id) {
      ...OrderFragment
    }
    ${orderFragment}
  }
`;
