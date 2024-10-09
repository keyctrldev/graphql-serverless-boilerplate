import { userResolver } from '../resolver/users.resolver';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Mock the DynamoDBClient
jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn().mockImplementation(() => ({
      send: jest.fn(),
    })),
    PutItemCommand: jest.fn(),
    GetItemCommand: jest.fn(),
    ScanCommand: jest.fn(),
  };
});

describe('userResolver', () => {
  let dynamoDB: DynamoDBClient;

  beforeEach(() => {
    dynamoDB = new DynamoDBClient({ region: "local", endpoint: "http://localhost:8000" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Mutation.createUser', () => {
    it('should create a user and return it', async () => {
      const mockSend = dynamoDB.send as jest.Mock; // Type assertion to jest.Mock
      const mockInput = {
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
      };
      const expectedResult = { ...mockInput };

      // Mock the send method to resolve with an empty object
      mockSend.mockResolvedValue({});

      // Call the resolver
      const result = await userResolver.Mutation.createUser({}, mockInput);

      // Assertions
      expect(mockSend).toHaveBeenCalledWith(expect.any(PutItemCommand));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Mutation.updateUser', () => {
    it('should update an existing user and return the updated user', async () => {
      const mockSend = dynamoDB.send as jest.Mock; // Type assertion to jest.Mock
      const mockInput = {
        id: '123',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        phone: '987-654-3210',
      };
      const expectedResult = { ...mockInput };

      // Mock the send method to resolve with an empty object
      mockSend.mockResolvedValue({});

      // Call the resolver
      const result = await userResolver.Mutation.updateUser({}, mockInput);

      // Assertions
      expect(mockSend).toHaveBeenCalledWith(expect.any(PutItemCommand));
      expect(result).toEqual(expectedResult);
    });
  });
});
