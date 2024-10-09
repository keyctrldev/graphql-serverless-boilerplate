import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { userResolver } from './users.resolver';

// Mock the specific commands from the AWS SDK
jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn(),
    GetItemCommand: jest.fn(),
    PutItemCommand: jest.fn(),
    ScanCommand: jest.fn(),
  };
});

describe('userResolver', () => {
  let mockSend: jest.Mock<any, any, any> | null=null;

  beforeEach(() => {
    mockSend = jest.fn();

    // Create a mock implementation of the DynamoDBClient
    (DynamoDBClient as jest.Mock).mockImplementation(() => {
      return {
        send: mockSend,
      };
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query: User', () => {
    it('should fetch a user by ID', async () => {
      const user = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };
      // mockSend.mockResolvedValueOnce({ Item: marshall(user) });

      const result = await userResolver.Query.User({}, { id: '1' });

      expect(mockSend).toHaveBeenCalledWith(
        expect.any(GetItemCommand)
      );
      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      // mockSend.mockResolvedValueOnce({});

      await expect(userResolver.Query.User({}, { id: '1' })).rejects.toThrow(
        'User with ID 1 not found'
      );
    });
  });

  describe('Query: Users', () => {
    it('should fetch all users', async () => {
      const users = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          phone: '0987654321',
        },
      ];

      // mockSend.mockResolvedValueOnce({ Items: users.map((user) => marshall(user)) });

      const result = await userResolver.Query.Users();

      expect(mockSend).toHaveBeenCalledWith(expect.any(ScanCommand));
      expect(result).toEqual(users);
    });
  });

  describe('Mutation: createUser', () => {
    it('should create a user', async () => {
      const user = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };

      const result = await userResolver.Mutation.createUser({}, user);

      expect(mockSend).toHaveBeenCalledWith(
        expect.any(PutItemCommand)
      );
      expect(result).toEqual(user);
    });
  });

  describe('Mutation: updateUser', () => {
    it('should update a user', async () => {
      const user = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };

      const result = await userResolver.Mutation.updateUser({}, user);

      expect(mockSend).toHaveBeenCalledWith(
        expect.any(PutItemCommand)
      );
      expect(result).toEqual(user);
    });
  });
});
