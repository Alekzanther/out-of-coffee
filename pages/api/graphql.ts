import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../lib/apollo-server/schema';
import connectToDb from '../../lib/db/db';

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    await connectToDb();
    console.log('req', req);
    console.log('res', res);
    return { req, res };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
