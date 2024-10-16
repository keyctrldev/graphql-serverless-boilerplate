import type   { MutationResolvers } from './../../../types.generated';
import { DynamoDB } from 'aws-sdk';

// Initialize DynamoDB Document Client
const dynamoDB = new DynamoDB.DocumentClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

export const createUser: NonNullable<MutationResolvers['createUser']> = async (
    _parent,
    { id, firstName, lastName, email }
  ) => {
    // Check if the user already exists
    const getParams = {
      TableName: 'Users',
      Key: { id },
    };
  
    const existingUser = await dynamoDB.get(getParams).promise();
  
    if (existingUser.Item) {
      throw new Error(`User with ID ${id} already exists`);
    }
  
    const putParams = {
      TableName: 'Users',
      Item: {
        id,
        firstName,
        lastName,
        email,
      },
    };
  
    await dynamoDB.put(putParams).promise();
    return putParams.Item; // Return the newly created user
  };