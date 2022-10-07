import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../lib/apollo-server/schema';
import connectToDb from '../../lib/db/db';

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    await connectToDb();
    return req;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
