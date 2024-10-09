import { IResolvers } from "@graphql-tools/utils";
import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// Initialize DynamoDB Client for local DynamoDB
const dynamoDB = new DynamoDBClient({
  region: "local",
  endpoint: "http://localhost:8000",
});

// Define a user object interface
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Define the structure for createUser and updateUser arguments using Pick
type CreateUserArgs = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'>;
type UpdateUserArgs = CreateUserArgs;

// Define Query and Mutation resolvers
interface QueryResolvers {
  User: (_: any, args: { id: string }) => Promise<User | null>;
  Users: () => Promise<User[]>;
}

interface MutationResolvers {
  createUser: (_: any, args: CreateUserArgs) => Promise<User>;
  updateUser: (_: any, args: UpdateUserArgs) => Promise<User>;
}

// Extend the IResolvers type to match the schema
interface UserResolvers extends IResolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const userResolver: UserResolvers = {
  Query: {
    User: async (_, { id }) => {
      try {
        const params = {
          TableName: "Users",
          Key: marshall({ id }),
        };

        const result = await dynamoDB.send(new GetItemCommand(params));

        if (!result.Item) {
          throw new Error(`User with ID ${id} not found`);
        }

        return unmarshall(result.Item) as User;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },

    Users: async () => {
      try {
        const params = {
          TableName: "Users",
        };

        const result = await dynamoDB.send(new ScanCommand(params));
        return result.Items ? result.Items.map((item) => unmarshall(item) as User) : [];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
  },

  Mutation: {
    createUser: async (_, { id, firstName, lastName, email, phone }: CreateUserArgs) => {
      try {
        const params = {
          TableName: "Users",
          Item: marshall({
            id,
            firstName,
            lastName,
            email,
            phone,
          }),
        };

        await dynamoDB.send(new PutItemCommand(params));
        return { id, firstName, lastName, email, phone }; // Returning the created user
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    },

    updateUser: async (_, { id, firstName, lastName, email, phone }: UpdateUserArgs) => {
      try {
        const params = {
          TableName: "Users",
          Item: marshall({
            id,
            firstName,
            lastName,
            email,
            phone,
          }),
        };

        await dynamoDB.send(new PutItemCommand(params));
        return { id, firstName, lastName, email, phone }; // Returning the updated user
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
      }
    },
  },
};
