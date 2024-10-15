import { ApolloServer } from 'apollo-server-lambda';;
import claimResolver from './resolver/claims.resolver';
import { userResolver } from './resolver/users.resolver';
import { book } from './schema/book/resolvers/Query/book';
import { markBookAsRead } from './schema/book/resolvers/Mutation/markBookAsRead'; // Include this if you're using the mutation


import { readFileSync } from 'fs';
import { join } from 'path';

// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, '/schema.graphql'), 'utf-8');

// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: [claimResolver, userResolver],
  introspection: process.env.NODE_ENV !== 'production',
//   playground: process.env.NODE_ENV !== 'production',
});
