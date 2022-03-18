import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connectToDb } from './db/db';
import { schema } from './graphql/schema';
import * as models from './models';

const port = 8008;

async function initServer() {
  try {
    const app = express();
    console.log('hej fron  extress');

    await connectToDb();

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      context: () => ({
        models: models,
      }),
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
