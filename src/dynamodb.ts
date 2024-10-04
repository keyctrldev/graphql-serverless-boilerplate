import { DynamoDB } from 'aws-sdk';

export const dynamoDB = new DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
  // This just hardcoded for quick testing
  // TODO: this will be moved to secret store later
  accessKeyId: "myAccessKeyId", // Optional if using IAM roles or default credentials
  secretAccessKey: "mySecretAccessKey", // Optional
});