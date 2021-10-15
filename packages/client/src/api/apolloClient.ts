import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'localhost:8080';

export const client = new ApolloClient({
  uri: `http://${uri}/v1/graphql`,
  cache: new InMemoryCache(),
});