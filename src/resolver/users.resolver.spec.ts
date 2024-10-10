const { DynamoDB } = require('aws-sdk');
const { userResolver } = require('./users.resolver');

describe('userResolver', () => {
  const dynamoDB = new DynamoDB.DocumentClient({ region: 'us-east-1' });

  beforeEach(async () => {
    const scanParams = { TableName: 'Users' };
    const data = await dynamoDB.scan(scanParams).promise();

    // const deleteRequests = data.Items?.map((item: { id: string }) => ({
    //   DeleteRequest: {
    //     Key: { id: item.id },
    //   },
    // }));

    // if (deleteRequests && deleteRequests.length > 0) {
    //   const deleteParams = {
    //     RequestItems: {
    //       'Users': deleteRequests,
    //     },
    //   };
    //   await dynamoDB.batchWrite(deleteParams).promise();
    // }
  });

  // ... rest of your tests

  describe('Query: User', () => {
    it('should fetch a user by ID', async () => {
      const user = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };

      const putParams = {
        TableName: 'Users',
        Item: user,
      };
      await dynamoDB.put(putParams).promise();

      const result = await userResolver.Query.User({}, { id: '1' });

      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      await expect(userResolver.Query.User({}, { id: '1' })).rejects.toThrow('User with ID 1 not found');
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

      const putParams = {
        TableName: 'Users',
        Item: users[0],
      };
      await dynamoDB.put(putParams).promise();

      putParams.Item = users[1];
      await dynamoDB.put(putParams).promise();

      const result = await userResolver.Query.Users();

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

      const getParams = {
        TableName: 'Users',
        Key: { id: '1' },
      };
      const data = await dynamoDB.get(getParams).promise();

      expect(result).toEqual(user);
      expect(data.Item).toEqual(user);
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

      const putParams = {
        TableName: 'Users',
        Item: user,
      };
      await dynamoDB.put(putParams).promise();

      const updatedUser = {
        ...user,
        firstName: 'Jonathan',
      };

      const result = await userResolver.Mutation.updateUser({}, updatedUser);

      const getParams = {
        TableName: 'Users',
        Key: { id: '1' },
      };
      const data = await dynamoDB.get(getParams).promise();

      expect(result).toEqual(updatedUser);
      expect(data.Item).toEqual(updatedUser);
    });
  });
});
