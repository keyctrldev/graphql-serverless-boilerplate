import { IResolvers } from "@graphql-tools/utils";
import {
  updateUserProfile,
  signUp,
  userProfileInfo,
} from "../services/member.service";
import { QueryUserProfileInfoArgs } from "../types";
import { GraphQLResolveInfo } from "graphql";
import { cognitoUser } from "../services/cognito.service";

export const memberResolver: IResolvers = {
  Query: {
    userProfileInfo: async (
      _,
      args: QueryUserProfileInfoArgs,
      context,
      info: GraphQLResolveInfo
    ) => {
      const result = await userProfileInfo(args.memberId, info);
      return result;
    },
  },
  Mutation: {
    updateUserProfile: async (_, args) => {
      const result = await updateUserProfile(args.input);
      return result;
    },
    signUp: async (_, args) => {
      const cognitoResult = await cognitoUser(args.input);
      if (cognitoResult && cognitoResult.username) {
        const result = await signUp(args.input);
        return result;
      }
      throw new Error("Failed to Signup");
    },
  },
};
