import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  # scalar JSON

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
    username: String!
    email: String!
    memberId: String
    groupNumber: String
    dob: String
    firstName: String!
    lastName: String!
    insuranceProvider: String
    mobileNumber: String
    streetAddress: String
    apartmentNumber: String
    zipCode: String
    city: String
    state: String
    UserConfirmed: Boolean
    UserSub: String
  }

  type Tokens {
    accessToken: String
    idToken: String
    refreshToken: String
  }

  # type LogoutResponse {
  #   message: String!
  #   error: JSON
  # }

  type Query {
    claims(memberId: String!): [Claim]

    signUp(
      username: String!,
      password: String!,
      email: String!,
      memberId: String,
      groupNumber: String,
      dob: String,
      firstName: String!,
      lastName: String!,
      insuranceProvider: String,
      mobileNumber: String,
      streetAddress: String,
      apartmentNumber: String,
      zipCode: String,
      city: String,
      state: String
    ): User     

    signIn(username: String!, password: String!): Tokens

    # logout(token: String!): LogoutResponse
  }
`;
