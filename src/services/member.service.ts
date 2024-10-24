import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "../dynamodb";
import { UpdateUserProfileInput, SignUpInput } from "../types";
import { ApolloError } from "apollo-server-lambda";
import {
  signUpResponse,
  updateUserProfileResponse,
} from "../mappers/signup-response.mapper";
import { requiredFields } from "../utils/utils";
import { GraphQLResolveInfo } from "graphql";


export const userProfileInfo = async (
  memberId: string,
  info: GraphQLResolveInfo
) => {
  const projectionExpression = await requiredFields(info);

  const params = {
    TableName: "User",
    Key: { memberId: memberId },
    projectionExpression: projectionExpression,
  };
  try {
    const result = await dynamoDB.get(params);
    if (!result.Item) {
      throw new Error(`User with ID ${memberId} not found`);
    }
    return result.Item;
  } catch (err) {
    throw new ApolloError("Error", "Error", { err });
  }
};

export const updateUserProfile = async (input: UpdateUserProfileInput) => {
  const params = {
    TableName: "User",
    Key: {
      memberId: input.memberId,
    },
    UpdateExpression: "set agreementAcceptance = :agreementValue",
    ExpressionAttributeValues: {
      ":agreementValue": input.agreementAcceptance,
    },
  };
  try {
    const command = new UpdateCommand(params);
    const result = await dynamoDB.send(command);
    if (result.$metadata.httpStatusCode == 200) {
      const response = await updateUserProfileResponse();
      return response;
    }
    throw new Error("Failed to add user");
  } catch (err) {
    throw new ApolloError("Error", "Error", { err });
  }
};

export const signUp = async (input: SignUpInput) => {
  const params = {
    TableName: "User",
    Item: {
      memberId: input.memberId,
      groupNumber: input.groupNumber,
      email: input.email,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
      dob: input.dob,
      insuranceProvider: input.insuranceProvider,
      mobileNumber: input.mobileNumber,
      address: input.address,
    },
    ConditionExpression: "attribute_not_exists(memberId)",
  };
  try {
    const command = new PutCommand(params); // Create the put command
    // console.log('---->', command)
    const result = await dynamoDB.send(command);
    if (result.$metadata.httpStatusCode == 200) {
      const response = await signUpResponse();
      return response;
    } else {
      throw new Error("Failed to add user");
    }
    
  } 
  // eslint-disable-next-line
  catch (err: any) {
    
    if (err.$metadata.httpStatusCode == 400) {
      throw new ApolloError("User already exists", "BAD_REQUEST", {
        statusCode: 400,
      });
    }
    throw new ApolloError("Error", "Error", { err });
  }
};
