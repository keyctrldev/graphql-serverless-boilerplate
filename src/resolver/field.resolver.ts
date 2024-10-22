import { IResolvers } from "@graphql-tools/utils";
import { ApolloError } from "apollo-server-lambda";
import { dynamoDB } from "../dynamodb";
import { handleDynamoDBError } from "../errors"

async function getUserFromDatabase(id: String) {
    const params = {
        TableName: "Users",
        Key: { id },
    }
    try {
        const result = await dynamoDB.get(params);

        if (!result.Item) {
            throw new ApolloError('User not found', 'USER_NOT_FOUND', { statusCode: 404 });
        }
        return result.Item
    } catch (err) {
        return handleDynamoDBError(err);
    }
}

export const fieldResolver: IResolvers = {
  Query: {
    getUser: async (parent, args, context) => {
        const user = await getUserFromDatabase(args.id);
        return user;
    }
  },
};
