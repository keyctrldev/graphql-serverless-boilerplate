import type   { MutationResolvers } from './../../../types.generated';
import {dynamoDB } from "../../../../dynamodb"
// Initialize DynamoDB Document Client
export const createUser: NonNullable<MutationResolvers['createUser']> = async (
    _parent,
    { id, firstName, lastName, email }
  ) => {
    // Check if the user already exists
    const getParams = {
      TableName: 'Users',
      Key: { id },
    };
  
    const existingUser = await dynamoDB.get(getParams);
  
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
  
    await dynamoDB.put(putParams);
    return putParams.Item; // Return the newly created user
  };