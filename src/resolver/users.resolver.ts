import { DynamoDB } from 'aws-sdk';
import { IResolvers } from '@graphql-tools/utils';

const dynamoDB = new DynamoDB.DocumentClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

export const userResolver: IResolvers = {
  Query: {
    User: async (_, { id }) => {
      const params = {
        TableName: 'Users',
        Key: { id },
      };

      const result = await dynamoDB.get(params).promise();

      if (!result.Item) {
        throw new Error(`User with ID ${id} not found`);
      }

      return result.Item;
    },

    Users: async () => {
      const params = {
        TableName: 'Users',
      };

      const result = await dynamoDB.scan(params).promise();
      return result.Items;
    },
  },
  Mutation: {
    createUser: async (_, { id, firstName, lastName, email, phone }) => {
      // Check if the user already exists
      const getParams = {
        TableName: 'Users',
        Key: { id },
      };

      const existingUser = await dynamoDB.get(getParams).promise();

      if (existingUser.Item) {
        // Throw an error if the user with the same ID already exists
        throw new Error(`User with ID ${id} already exists`);
      }

      const putParams = {
        TableName: 'Users',
        Item: {
          id,
          firstName,
          lastName,
          email,
          phone,
        },
      };

      await dynamoDB.put(putParams).promise();
      return putParams.Item;
    },
  },
};
