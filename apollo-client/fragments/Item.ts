import { gql } from '@apollo/client';

export const itemFragment = gql`
  fragment ItemFragment on Item {
    _id
    name
    productUrl
    productImageUrl
    __typename
  }
`;
