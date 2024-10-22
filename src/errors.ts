import { ApolloError } from "apollo-server-lambda";

export const handleDynamoDBError = (err: any, context?: any) => {
    if (err.code === 'ProvisionedThroughputExceededException') {
        context.res.status(400)
      throw new ApolloError('Too many requests to DynamoDB', 'THROUGHPUT_EXCEEDED', { statusCode: 429 });
    } else if (err.code === 'ResourceNotFoundException' || err.extensions.code === 'NOT_FOUND') {
      throw new ApolloError('Resource not found', 'RESOURCE_NOT_FOUND', { statusCode: 404 });
    } else if (err.extensions.code === 'USER_NOT_FOUND') {
        throw new ApolloError('User not found', 'USER_NOT_FOUND', { statusCode: 404 });
    } else if (err.code === 'ConditionalCheckFailedException') {
      throw new ApolloError('Condition check failed', 'CONDITION_CHECK_FAILED', { statusCode: 409 });
    } else if (err.code === 'ValidationException') {
      throw new ApolloError('Invalid request parameters', 'VALIDATION_ERROR', { statusCode: 400 });
    } else {
      throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR', { statusCode: 500 });
    }
  };    