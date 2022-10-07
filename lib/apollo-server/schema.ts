import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { baseOrderResolver } from './resolvers';
import { itemResolver } from './resolvers';
import { orderResolver } from './resolvers';

const typesLoader = loadFilesSync(
  path.join(
    path.resolve('./'),
    './lib/apollo-server/typedefinitions/**/*.graphql',
  ),
);

const typeDefs = mergeTypeDefs(typesLoader, {
  ignoreFieldConflicts: true,
});

const resolvers = mergeResolvers([
  baseOrderResolver,
  itemResolver,
  orderResolver,
]);

export const schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
});
