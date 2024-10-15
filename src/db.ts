import knex from 'knex';
import { getSecret } from "./secrets";
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
