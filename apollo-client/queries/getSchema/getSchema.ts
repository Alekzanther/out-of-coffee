import { gql } from '@apollo/client';

export const getSchema = gql`
  query GetSchema {
    __schema {
      __typename
    }
  }
`;
