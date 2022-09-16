import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo-two/schema';
import { connectToDb } from '../../db/db';

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

// const handler = async (res, req) => {
//   await connectToDb();
//   await startServer;
//   return await apolloServer.createHandler({ path: '/api/graphql' })(
//     req,
//     res,
//   );
// };

// export default handler;

export default apolloServer.createHandler({ path: '/api/graphql' });
