import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './schema';
import { claimResolver } from './resolver/claims.resolver';

// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: claimResolver,
  introspection: process.env.NODE_ENV !== 'production',
//   playground: process.env.NODE_ENV !== 'production',
});
