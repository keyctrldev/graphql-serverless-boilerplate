import knex from 'knex';

// Initialize Knex connection to SQL Server
// The below hardcoded credentials are for quick local development.
// TODO: Move them environment variables and secrets later
const db = knex({
  client: 'mssql',
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    options: {
      // trustedConnection: true
    },
  },
});

export default db;
