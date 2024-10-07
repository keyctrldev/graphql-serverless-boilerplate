import { ApolloServer } from 'apollo-server-lambda';;
import claimResolver from './resolver/claims.resolver';
import { readFileSync } from 'fs';
import { join } from 'path';
import { userResolver } from './resolver/users.resolver';

const resolvers = {Query:{...claimResolver.Query,...userResolver.Query}}
// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, '/schema.graphql'), 'utf-8');


// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: claimResolver,
  introspection: process.env.NODE_ENV !== 'production',
//   playground: process.env.NODE_ENV !== 'production',
});
