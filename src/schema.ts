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
    name: String!
    userName: String!
  }

  type Query {
    claims(memberId: String!): [Claim]
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(id: ID!, name: String!, userName: String!): User
  }
`;
