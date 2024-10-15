import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: "us-east-1",
});

export const getSecret: any = async () => {
  try {
    const params = {
      SecretId: `arn:aws:secretsmanager:us-east-1:575892549481:secret:MySecrtes-2kMVRi`,
    };
    const command = new GetSecretValueCommand(params);
    const response = await client.send(command);
    if (response.SecretString) {
        return JSON.parse(response.SecretString);
    }
    
  } catch (error) {
    return error;
  }
}
