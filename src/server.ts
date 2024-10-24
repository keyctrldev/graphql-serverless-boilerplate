import { ApolloServer } from "apollo-server-lambda";
import claimResolver from "./resolver/claims.resolver";
import { userResolver } from "./resolver/users.resolver";
import { memberResolver } from "./resolver/member.resolver"
import { readFileSync } from "fs";
import { join } from "path";

// Read the GraphQL schema
const typeDefs = readFileSync(join(__dirname, "/schema.graphql"), "utf-8");

// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers: [claimResolver, userResolver, memberResolver],
  introspection: process.env.NODE_ENV !== "production",
  //   playground: process.env.NODE_ENV !== 'production',
  formatError: (err) => {
    return {
      message: err.message,
      code: err.extensions.code,
      details: err,
    };
  },
});
