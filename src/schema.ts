import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Claim {
    claimStatus: String
    medicationName: String
    claimId: String
    claimDate: String
    medicationCost: Float
    planPaid: Float
    memberPaid: Float
    memberId: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
  }

  type Query {
    claims(memberId: String!): [Claim]
    User(id: ID!): User
    Users: [User]
  }

  type Mutation {
    createUser(id: ID!, firstName: String!, lastName: String!, email: String!, phone: String!): User
  }
`;
