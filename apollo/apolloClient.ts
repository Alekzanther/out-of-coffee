import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'localhost:8008';

export const client = new ApolloClient({
  uri: `http://${uri}/graphql`,
  cache: new InMemoryCache(),
});