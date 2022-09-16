import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Item {
    name: String!
    productUrl: String!
    _id: String!
  }
  type Query {
    GetItems: [Item]
  }
`;
