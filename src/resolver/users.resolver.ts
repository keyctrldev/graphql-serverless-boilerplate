import { IResolvers } from "@graphql-tools/utils";
import { dynamoDB } from "../dynamodb";

export const userResolver: IResolvers = {
  Query: {
    User: async (_, { id ,}) => {
      const params = {
        TableName: "Users",
        Key: { id },
      };
  
      const result = await dynamoDB.get(params);
  
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

    Users: async () => {
      const params = {
        TableName: "Users",
      };

      const result = await dynamoDB.scan(params);
      return result.Items; 
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (_, { id, firstName, lastName, email, phone }) => {
      const params = {
        TableName: "Users",
        Item: {
          id,
          firstName,
          lastName,
          email,
          phone
        },
      };
  
      // Save the user to DynamoDB
      // await dynamoDB.put(params);
  
      // Return the created user object
      return params.Item;
    },
  },
  
};
