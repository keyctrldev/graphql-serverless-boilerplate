import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export const dynamoDB = DynamoDBDocument.from(new DynamoDB({
    region: "us-west-2",
    // endpoint: "http://localhost:8000",
    // endpoint: "dynamodb.us-east-1.amazonaws.com"
    // This just hardcoded for quick testing
    credentials: {
      accessKeyId: "AKIAWOOXUDTUGWBCXOG2", // Optional if using IAM roles or default credentials
      secretAccessKey: "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", // Optional
      }
}));