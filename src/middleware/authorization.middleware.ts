import { IMiddlewareFunction } from 'graphql-middleware';
import { AuthenticationError } from 'apollo-server-lambda';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { POOL_DATA } from '../constants';
import { IRuleFunction } from 'graphql-shield/typings/types';
import { GraphQLResolveInfo } from 'graphql';



const verifier = CognitoJwtVerifier.create({
    userPoolId: POOL_DATA.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: POOL_DATA.COGNITO_APP_CLIENT_ID,
  });

// Middleware to check authentication
export const authMiddleware:IRuleFunction = async ( parent:any, args:any, context:any, info:GraphQLResolveInfo) => {
  const authHeader = context.headers.Authorization;    
 
  if (!authHeader) {
    throw new AuthenticationError('Authorization header is missing');
  }

  const token = authHeader.split(' ')[1]; // Assuming Bearer <token>

  try {
    // Verify the JWT token
    const decodedToken =  await verifier.verify(token);
    context.user = decodedToken; // Attach the user to the context
    context.token = token;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
