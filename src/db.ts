import knex from 'knex';

// Initialize Knex connection to SQL Server
// The below hardcoded credentials are for quick local development.
// TODO: Move them environment variables and secrets later
const db = knex({
  client: 'mssql',
  connection: {
    host: '127.0.0.1',
    user: 'sa',
    password: 'P@ssw0rd1',
    database: 'tempdb',
    options: {
      // trustedConnection: true
    },
  },
});

export default db;
