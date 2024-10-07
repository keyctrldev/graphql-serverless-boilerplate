import AWS from 'aws-sdk';
import { LogoutArgs, SignInResponse } from "../models/authentication.model";
import { QuerySignOutArgs,SignOutResponse, QuerySignInArgs } from "../types";
import { generateHash } from "../utils";
import { POOL_DATA } from '../constants';



export const authenticationResolver = {
    Query : {
        signIn: async (_: any, args: QuerySignInArgs): Promise<SignInResponse> => {
            const { username, password } = args;
            const cognito = new AWS.CognitoIdentityServiceProvider();
            const secretHash =  generateHash(username)
            const response = await cognito
              .initiateAuth({
                AuthFlow: "USER_PASSWORD_AUTH",
                AuthParameters: { USERNAME: username, PASSWORD: password, SECRET_HASH: secretHash },
                ClientId: POOL_DATA.COGNITO_APP_CLIENT_ID,
              })
              .promise();
      
            // Extract tokens from the response
            const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult || {};
      
            return {
              accessToken: AccessToken,
              idToken: IdToken,
              refreshToken: RefreshToken,
              message: "User successfully authenticated!",
              customData: response as unknown as Record<string, unknown>,
            };
        },
        signOut: async (_: any, args: QuerySignOutArgs): Promise<SignOutResponse> => {
            const { token } = args;
            let data: SignOutResponse = { message: '', error: null };
      
            try {
              const cognito = new AWS.CognitoIdentityServiceProvider();
              await cognito.globalSignOut({ AccessToken: token }).promise();
              data.message = "User successfully logged out!";
            } catch (err) {
              console.error(err);
              data.message = "Error during logout.";
              data.error = err as unknown as Record<string, unknown>;
            }
      
            return data;
          }
    }
}