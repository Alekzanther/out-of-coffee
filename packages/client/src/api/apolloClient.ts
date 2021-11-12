import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'localhost:8008';

export const client = new ApolloClient({
  uri: `http://${uri}/graphql`,
  cache: new InMemoryCache(),
});
