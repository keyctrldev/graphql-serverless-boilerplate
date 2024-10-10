import { userResolver } from './users.resolver';
import { dynamoDB } from '../dynamodb';

test('Basic Jest setup and DynamoDB spy works', async () => {
  const mockUser = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
  };

  // Spy on the 'get' method of DynamoDB
  const getSpy = jest.spyOn(dynamoDB, 'get').mockReturnValue({
    promise: jest.fn().mockResolvedValue({ Item: mockUser }),
  } as any);

  // Debugging line to check if the getSpy was called
  console.log(getSpy.mock.calls);

  //  Clean up the spy after the test
  getSpy.mockRestore();
});

