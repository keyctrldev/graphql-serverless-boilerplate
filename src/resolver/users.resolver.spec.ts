import { userResolver } from './users.resolver';
import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

// Mock the DynamoDBClient
jest.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
  })),
  GetItemCommand: jest.fn(),
  PutItemCommand: jest.fn(),
}));

describe('User Resolver', () => {
  let dynamoDB: DynamoDBClient;

  beforeEach(() => {
    dynamoDB = new DynamoDBClient({});
    jest.clearAllMocks();
  });

  describe('Query: User', () => {
    it('should return a user when found', async () => {
      const user = { id: '1', firstName: 'John', lastName: 'Doe' };
      const mockResponse = { Item: marshall(user) };

      // Mock the send method to return a user when the GetItemCommand is called
      (dynamoDB.send as jest.Mock).mockResolvedValue(mockResponse);

      // Call the resolver
      const result = await userResolver.Query.User(null, { id: '1' });

      // Expect the result to match the user
      expect(result).toEqual(user);

      // Ensure the send method was called with a GetItemCommand
      expect(dynamoDB.send).toHaveBeenCalledWith(expect.any(GetItemCommand));
    });

    it('should throw an error when the user is not found', async () => {
      // Mock the send method to return no item
      (dynamoDB.send as jest.Mock).mockResolvedValue({ Item: null });

      // Call the resolver and expect an error
      await expect(userResolver.Query.User(null, { id: '1' }))
        .rejects
        .toThrow('User with ID 1 not found');
    });
  });

  describe('Mutation: createUser', () => {
    it('should create a new user', async () => {
      const user = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890' };

      // Mock the send method for PutItemCommand
      (dynamoDB.send as jest.Mock).mockResolvedValue({}); // Assume the operation is successful

      // Call the resolver to create a new user
      const result = await userResolver.Mutation.createUser(null, user);

      // Expect the result to match the user
      expect(result).toEqual(user);

      // Ensure the send method was called with a PutItemCommand
      expect(dynamoDB.send).toHaveBeenCalledWith(expect.any(PutItemCommand));
    });
  });
});
