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

const typeDefs = mergeTypeDefs(typesLoader);
const resolvers = mergeResolvers([
  baseOrderResolver,
  itemResolver,
  orderResolver,
]);

export const schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
});

// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { typeDefs } from './type-defs';
// import { resolvers } from './resolvers-no';

// export const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
