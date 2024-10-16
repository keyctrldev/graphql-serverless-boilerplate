import { ApolloServer } from 'apollo-server-lambda';
import claimResolver from './resolver/claims.resolver';

import { user } from './schema/user/resolvers/Query/user';
import { createUser } from './schema/user/resolvers/Mutation/createUser';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, '/schema.graphql'), 'utf-8');
// const typeDefs= readFileSync(join(__dirname,'./schmea/base/schema.graphql'), 'utf-8');
console.log(typeDefs) 
// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      user, // User resolver
    },
    Mutation: {
      createUser, // Added createUser mutation resolver here
      // Add other mutations as needed
    },
    // If you have more resolvers (like for claims), add them here
  },
  introspection: process.env.NODE_ENV !== 'production',
  // playground: process.env.NODE_ENV !== 'production',
});
