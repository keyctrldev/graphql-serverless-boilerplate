import { ApolloServer } from 'apollo-server-lambda';;
import claimResolver from './resolver/claims.resolver';
import { userResolver } from './resolver/users.resolver';
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
  formatError: (err) => {
    return {
      message: err.message,
      code: err.extensions.code === 'USER_NOT_FOUND' ? 404 : 400,
    };
  },
  context: ({ event, context }) => ({
    functionName: context.functionName,
    event,
    context,
  }),
  formatResponse: (response, { context }) => {
    if (response.errors) {
      const hasErrors = response.errors && response.errors.length > 0;
      const error = hasErrors ? response.errors[0] : null;
      if (error) {
        // Customize HTTP status code based on error type
        if (error?.extensions?.code === 'USER_NOT_FOUND') {
          return {
            message: 'USER NOT FOUND',
            extensions: {
              code: 'UNAUTHORIZED',
            },
            statusCode: 401
          }
        } else if (error?.extensions?.code === 'BAD_USER_INPUT') {
          return {
            message: 'BAD INPUT',
            extensions: {
              code: 'BAD_USER_INPUT',
            },
            statusCode: 400
          }
        } else if (error?.extensions?.code === 'INTERNAL_SERVER_ERROR') {
          return {
            message: 'INTERNAL SERVER ERROR',
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
            },
            statusCode: 500
          } // Set 500 Internal Server Error
        }
      } else {
        return {
          response,
          statusCode: 200
        }
      }
    }
    return response;
  },
});
