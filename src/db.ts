import knex from 'knex';

// Initialize Knex connection to SQL Server
const db = knex({
  client: 'mssql',
  connection: {
    host: '127.0.0.1',
    user: 'sa',
    password: 'P@ssw0rd1',
    database: 'tempdb',
    options: {
      encrypt: false,
    //   trustServerCertificate: true,
      trustedConnection: true
    },
  },
});

export default db;
