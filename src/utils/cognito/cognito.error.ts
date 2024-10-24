import { GraphQLError, GraphQLErrorOptions } from "graphql";

// Define types for Cognito exceptions and mapped errors
type CognitoErrorMapType = Record<string, {
    message: string;
    statusCode: number;
  }>;

// Error map for known Cognito errors
const cognitoErrorMap: CognitoErrorMapType = {
  AliasExistsException: {
    message: "An account with this email or phone number already exists.",
    statusCode: 400,
  },
  CodeMismatchException: {
    message: "The verification code provided is incorrect.",
    statusCode: 400,
  },
  ExpiredCodeException: {
    message: "The verification code has expired. Please request a new one.",
    statusCode: 400,
  },
  ForbiddenException: {
    message: "Access is forbidden. Please contact support.",
    statusCode: 403,
  },
  InternalErrorException: {
    message: "An internal error occurred. Please try again later.",
    statusCode: 500,
  },
  InvalidLambdaResponseException: {
    message: "Invalid response from the server. Please try again.",
    statusCode: 400,
  },
  InvalidParameterException: {
    message:
      "One or more parameters are invalid. Check the input and try again.",
    statusCode: 400,
  },
  LimitExceededException: {
    message: "You have exceeded the allowed limit. Please try again later.",
    statusCode: 400,
  },
  NotAuthorizedException: {
    message: "You are not authorized to perform this action.",
    statusCode: 401,
  },
  ResourceNotFoundException: {
    message: "The requested resource was not found.",
    statusCode: 404,
  },
  TooManyFailedAttemptsException: {
    message: "Too many failed attempts. Please try again later.",
    statusCode: 429,
  },
  TooManyRequestsException: {
    message: "Too many requests. Please slow down.",
    statusCode: 429,
  },
  UnexpectedLambdaException: {
    message: "An unexpected error occurred with our server. Please try again.",
    statusCode: 500,
  },
  UserLambdaValidationException: {
    message: "User validation failed. Please check your input.",
    statusCode: 400,
  },
  UserNotFoundException: {
    message: "The user does not exist.",
    statusCode: 404,
  },
};

export interface CognitoError extends Error {
  code?: string; // `code` is optional, but `name` must be defined
  name: string; // Match the `Error` interface requirement
}

// Handle AWS Cognito errors and map them to GraphQL errors
export const handleCognitoError = (error: CognitoError): GraphQLError => {
  const errorType = error.code || error.name;
  const mappedError = cognitoErrorMap[errorType];

  if (mappedError) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: mappedError.statusCode.toString(),
        errorType: errorType,
        cognitoMessage: error.message,
      },
    };
    return new GraphQLError(mappedError.message, options);
  }

  // Default fallback for unhandled exceptions
  const fallbackOptions: GraphQLErrorOptions = {
    extensions: {
      code: "500",
      errorType: errorType,
      cognitoMessage: error.message,
    },
  };

  return new GraphQLError("An unknown error occurred.", fallbackOptions);
};
