import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "../dynamodb";
import { UpdateUserProfileInput, SignUpInput } from "../types";
import { ApolloError } from "apollo-server-lambda";

export const userProfileInfo = async (memberId: string) => {
  const params = {
    TableName: "User",
    Key: { memberId: memberId },
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
    if (result.$metadata.httpStatusCode != 200) {
      throw new Error("Failed to add user");
    }
    return {
      success: true,
      message: "User updated successfully",
    };
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
  };
  try {
    const result = await dynamoDB.put(params);
    if (result.$metadata.httpStatusCode != 200) {
      throw new Error("Failed to add user");
    }
    return {
      success: true,
      message: "User added successfully",
    };
  } catch (err) {
    throw new ApolloError("Error", "Error", { err });
  }
};
