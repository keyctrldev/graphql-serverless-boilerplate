import { ApolloServer } from 'apollo-server-lambda';;
import claimResolver from './resolver/claims.resolver';
import { userResolver } from './resolver/users.resolver';
import { readFileSync } from 'fs';
import { join } from 'path';
import { applyDirectives } from './directives';
import { makeExecutableSchema } from '@graphql-tools/schema'; 
// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, '/schema.graphql'), 'utf-8');

let schema = makeExecutableSchema({
  typeDefs,
  resolvers: [claimResolver, userResolver],
});

// Apply the custom directive transformer to the schema
schema = applyDirectives(schema);

// Apollo Server instance creation
export const server = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV !== 'production',
//   playground: process.env.NODE_ENV !== 'production',
});
