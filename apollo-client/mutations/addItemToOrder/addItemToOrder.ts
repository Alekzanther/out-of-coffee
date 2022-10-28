import { gql } from '@apollo/client';
import { orderFragment } from '../../fragments/Order';

export const addItemToOrderMutation = gql`
  mutation addItemToOrder($item: NewItem!) {
    AddItemToOrder(item: $item) {
      ...OrderFragment
    }
    ${orderFragment}
  }
`;
