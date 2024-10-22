import { ApolloServer } from "apollo-server-lambda";
import claimResolver from "./resolver/claims.resolver";
import { userResolver } from "./resolver/users.resolver";
import { readFileSync } from "fs";
import { join } from "path";
import { fieldResolver } from "./resolver/field.resolver"
// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, "/schema.graphql"), "utf-8");

// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: [claimResolver, userResolver, fieldResolver],
  introspection: process.env.NODE_ENV !== "production",
  context: ({ event, context }) => ({ event, context }),
  formatError: (err) => {
    // Format the error to include the custom status code
    return {
      message: err.message,
      code: err.extensions.code || "INTERNAL_SERVER_ERROR",
      statusCode: err.extensions.statusCode || 500, // Default to 500
      // details: errs
    };
  },
});
