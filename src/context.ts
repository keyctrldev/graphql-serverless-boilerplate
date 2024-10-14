import { DynamoDB } from 'aws-sdk';

// Initialize the DynamoDB Document Client
const dynamoDB = new DynamoDB.DocumentClient({
  endpoint: 'http://localhost:8000', // Local DynamoDB endpoint
  region: 'us-west-2', 
});

// Define the context type
interface Context {
  dynamoDB: DynamoDB.DocumentClient;
}

// Create a function to provide context to GraphQL resolvers
export const createContext = (): Context => {
  return {
    dynamoDB, // Pass the Document Client to the context
  };
};
