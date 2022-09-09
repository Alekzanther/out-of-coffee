import { gql } from '@apollo/client';
import { itemFragment } from './Item';

export const orderFragment = gql`
  fragment OrderFragment on Order {
    _id
    status
    items {
      ...ItemFragment
    }
    creationDate
    endDate
    __typename
  ${itemFragment}
  }
`;
