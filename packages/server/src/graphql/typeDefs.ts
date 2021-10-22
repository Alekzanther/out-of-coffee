import { gql } from 'apollo-server-express';

export const typeDefs: any = gql`
  type Order {
    product: String
  }

  type Query {
    GetCurrentOrder: [Order]
  }
`;
