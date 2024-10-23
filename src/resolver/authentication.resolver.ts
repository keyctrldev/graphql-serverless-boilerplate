import {CognitoIdentityProviderClient, GlobalSignOutCommand, InitiateAuthCommand} from '@aws-sdk/client-cognito-identity-provider';
import { QuerySignOutArgs,SignOutResponse, QuerySignInArgs,SignInResponse } from "../types";
import { generateHash } from "../utilities/cognito/cognito.util";
import { POOL_DATA } from '../constants';



export const authenticationResolver = {
    Query : {
        signIn: async (_: any, args: QuerySignInArgs): Promise<SignInResponse> => {
            const { username, password } = args;
            const cognito = new CognitoIdentityProviderClient({region:'us-east-1'});
            const secretHash =  generateHash(username);
            const command = new InitiateAuthCommand({
              AuthFlow: "USER_PASSWORD_AUTH",
              AuthParameters: { USERNAME: username, PASSWORD: password, SECRET_HASH: secretHash },
              ClientId: POOL_DATA.COGNITO_APP_CLIENT_ID,
            })
            const response = await cognito.send(command);
      
            // Extract tokens from the response
            const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult || {};
      
            return {
              tokens:{
              accessToken: AccessToken,
              idToken: IdToken,
              refreshToken: RefreshToken
            },
              message: "User successfully authenticated!",
              customData: response as unknown as Record<string, unknown>,
            };
        },
        signOut: async (_: any, args: QuerySignOutArgs,context:any): Promise<SignOutResponse> => {
            const { token } = context;
            let data: SignOutResponse = { message: '', error: null };
      
            try {
              const cognito = new CognitoIdentityProviderClient({region:'us-east-1'});
              const command = new GlobalSignOutCommand({ AccessToken: token })
              const response = await cognito.send(command);
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