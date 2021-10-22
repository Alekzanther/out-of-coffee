const http = require('http');
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connectToDb } from './db';
import { schema } from './graphql/schema';

const port = 8008;

async function initServer() {
  const app = express();

  await connectToDb();

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port }, resolve),
  );
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
}

initServer();
