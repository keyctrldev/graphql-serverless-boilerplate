import { IResolvers } from "@graphql-tools/utils";
import { updateUserProfile, signUp, userProfileInfo } from "../services/auth.service";

export const authResolver: IResolvers = {
  Query: {
    userProfileInfo: async (_, { memberId }) => {
        const result = await userProfileInfo(memberId)
        return result
      },
  },
  Mutation: {
    updateUserProfile: async (_, { input }) => {
      const result = await updateUserProfile(input);
      return result;
    },
    signUp: async (_, { input }) => {
      const result = await signUp(input);
      return result;
    },
  },
};
