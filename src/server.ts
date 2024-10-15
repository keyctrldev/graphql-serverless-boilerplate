import { ApolloServer } from 'apollo-server-lambda';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import claimResolver from './resolver/claims.resolver';
import { userResolver } from './resolver/users.resolver';
import { cognitoUserResolver } from './resolver/user.cognito.resolver';
import { readFileSync } from 'fs';
import { join } from 'path';
import { authenticationResolver } from './resolver/authentication.resolver';
import  middlewares from "./middleware"


// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, '/schema.graphql'), 'utf-8');

const  resolvers = {Query: {...claimResolver.Query,...userResolver.Query,...authenticationResolver.Query,...cognitoUserResolver.Query}};
const executableSchema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(executableSchema,middlewares);


// Apollo Server instance creation
export const server = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: process.env.NODE_ENV !== 'production',
  context: ({ event }) => ({
    headers: event.headers,
  }),
//   playground: process.env.NODE_ENV !== 'production',
});
