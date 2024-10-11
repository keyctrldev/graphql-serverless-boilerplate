import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { getSecret } from "./secrets";

export const dynamoDB = DynamoDBDocument.from(new DynamoDB({
  region: "us-east-1",
  endpoint: getSecret.Dynamodb,
  // endpoint: "dynamodb.us-east-1.amazonaws.com"
  // This just hardcoded for quick testing
  // TODO: this will be moved to secret store later
  // accessKeyId: "myAccessKeyId", // Optional if using IAM roles or default credentials
  // secretAccessKey: "mySecretAccessKey", // Optional
}));