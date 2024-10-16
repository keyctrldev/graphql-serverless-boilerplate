import type { QueryResolvers } from "./../../../types.generated";
import { DynamoDB } from "aws-sdk";
import { User } from "./../../../types.generated"; // Adjust the import based on where your User type is defined

const dynamoDB = new DynamoDB.DocumentClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});

// Resolver to fetch a user by ID
export const user: NonNullable<QueryResolvers['user']> = async (_, { id }) => {
  const params = {
    TableName: 'Users',
    Key: { id },
  };

  // Fetch the user from DynamoDB
  const result = await dynamoDB.get(params).promise();

  // Check if the user was found
  if (!result.Item) {
    throw new Error(`User with ID ${id} not found`);
  }

  // Map the result.Item to match your User type
  const user: User = {
    id: result.Item.id,
    firstName: result.Item.firstName,
    lastName: result.Item.lastName,
    email: result.Item.email,
    // Add any other fields necessary to match your User type
  };

  return user;
};
