import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './schema';
import { claimResolver } from './resolver/claims.resolver';
import { userResolver } from './resolver/users.resolver'


// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: [claimResolver, userResolver],
  introspection: process.env.NODE_ENV !== 'production',
//   playground: process.env.NODE_ENV !== 'production',
});
