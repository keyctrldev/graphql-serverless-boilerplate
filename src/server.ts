import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './schema';
import { claimResolver } from './resolver/claims.resolver';
import { userResolver } from './resolver/users.resolver';

const resolvers = {Query:{...claimResolver.Query,...userResolver.Query}}


// Apollo Server instance creation
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
//   playground: process.env.NODE_ENV !== 'production',
});



// memberid
// groupnumber
// memberId
// groupNumber
// dob
// firstName
// lastName
// email
// password
// insuranceProvider 
// mobileNumber
// streetAddress
// aptartmentNumber
// zipCode
// city
// state


// !TODO
// grphql conversion
// refresh flow
// twillio for forgot password