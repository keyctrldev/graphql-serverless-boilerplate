import knex from 'knex';
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
// Initialize Knex connection to SQL Server
// The below hardcoded credentials are for quick local development.
// TODO: Move them environment variables and secrets later
const db = knex({
  client: 'mssql',
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: getSecret.SQL_PASSWORD,
    database: getSecret.SQL_DATABASE,
    options: {
      // trustedConnection: true
    },
  },
});

export default db;
