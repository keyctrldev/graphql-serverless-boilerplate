import { DynamoDB } from 'aws-sdk';
import { userResolver } from './users.resolver';

const dynamoDB = new DynamoDB({
  endpoint: 'http://localhost:8000', // Assuming you have DynamoDB Local running
  region: 'us-west-2', // Change to your desired region
});

describe('User Resolver Integration Tests', () => {
  beforeAll(async () => {
    // Create the Users table for testing
    await dynamoDB.createTable({
      TableName: 'Users',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    }).promise();
  });

  afterAll(async () => {
    // Delete the Users table after tests are done
    await dynamoDB.deleteTable({ TableName: 'Users' }).promise();
  });

  test('should create a new user successfully', async () => {
    const mockUser = {
      id: '12',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
    };

    // Cast to avoid TypeScript error
    const mutation = userResolver.Mutation as { createUser: Function };

    // Call the createUser mutation
    const result = await mutation.createUser(null, mockUser);

    // Assert that the returned user matches the input
    expect(result).toEqual(mockUser);
  });

  test('should throw an error if a user with the same ID already exists', async () => {
    const mockUser = {
      id: '123',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '0987654321',
    };

    // Cast to avoid TypeScript error
    const mutation = userResolver.Mutation as { createUser: Function };

    // First, create the user
    await mutation.createUser(null, mockUser);

    // Attempt to create the user again and expect an error
    await expect(mutation.createUser(null, mockUser)).rejects.toThrow(
      'User with ID 123 already exists'
    );
  });
});
