import { server } from './server';

// Lambda handler export for the GraphQL server
export const graphqlHandler = server.createHandler();
