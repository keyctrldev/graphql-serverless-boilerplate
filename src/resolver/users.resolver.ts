import { IResolvers } from "@graphql-tools/utils";
import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
  // This just hardcoded for quick testing
  // TODO: this will be moved to secret store later
  accessKeyId: "myAccessKeyId", // Optional if using IAM roles or default credentials
  secretAccessKey: "mySecretAccessKey", // Optional
});

export const userResolver: IResolvers = {
  Query: {
    getUser: async (_, { id ,}) => {
      const params = {
        TableName: "Users",
        Key: { id },
      };
  
      const result = await dynamoDB.get(params).promise();
  
      // If no user is found, throw an error or return null
      if (!result.Item) {
        throw new Error(`User with ID ${id} not found`);
      }
  
      // Ensure that the 'id' field is present
      if (!result.Item.id) {
        throw new Error(`User 'id' field is missing for ID ${id}`);
      }
  
      return result.Item;
    },

    getUsers: async () => {
      const params = {
        TableName: "Users",
      };

      const result = await dynamoDB.scan(params).promise();
      return result.Items; 
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (_, { id, name, userName }) => {
      const params = {
        TableName: "Users",
        Item: {
          id,
          name,
          userName,
        },
      };
  
      // Save the user to DynamoDB
      await dynamoDB.put(params).promise();
  
      // Return the created user object
      return params.Item;
    },
  },
  
};
