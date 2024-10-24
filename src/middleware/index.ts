import { rule, shield } from "graphql-shield";
import { authMiddleware } from "./authorization.middleware";

const isAuthenticated = rule()(authMiddleware);

export default shield({
  Query: {
    User: isAuthenticated,
    Users: isAuthenticated,
    claims: isAuthenticated,
    signOut: isAuthenticated,
  },
});
