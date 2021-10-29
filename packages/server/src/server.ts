import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connectToDb } from './db/db';
import { schema } from './graphql/schema';

const port = 8008;

async function initServer() {
  try {
    const app = express();

    await connectToDb();

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
      );
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

initServer();
