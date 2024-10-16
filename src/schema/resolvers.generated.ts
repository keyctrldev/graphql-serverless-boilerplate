/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { user as Query_user } from "./user/resolvers/Query/user";
import { createUser as Mutation_createUser } from "./user/resolvers/Mutation/createUser";

import { User } from "./user/resolvers/User";
export const resolvers: Resolvers = {
  Query: {  user: Query_user },
  Mutation: {
    createUser: Mutation_createUser,
  },
  User: User,
};
