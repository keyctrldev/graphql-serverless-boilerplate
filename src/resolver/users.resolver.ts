import { LogoutArgs, LogoutResponse, SignInArgs, SignInResponse, SignUpArgs, User } from "../models/users.model";
import { IResolvers } from '@graphql-tools/utils';
import AWS from 'aws-sdk';
import { generateHash } from "../utils";
import { POOL_DATA } from "../constants";




  AWS.config.update({ region: 'us-east-1' });   

  export const userResolver:IResolvers = {
    Query: {
        
        signUp: async (_: any, args: SignUpArgs): Promise<void | User> => {
            try {
          const {
            username,
            password,
            email,
            memberId,
            groupNumber,
            dob,
            firstName,
            lastName,
            insuranceProvider,
            mobileNumber,
            streetAddress,
            apartmentNumber,
            zipCode,
            city,
            state,
          } = args;
          
          const cognito = new AWS.CognitoIdentityServiceProvider();
    
          // Generate the SecretHash
         
          const secretHash = generateHash(username);
    
          // Create an array of Cognito UserAttributes
          const userAttributes = [
            { Name: 'email', Value: email },
            { Name: 'given_name', Value: firstName },
            { Name: 'family_name', Value: lastName },
            { Name: 'custom:memberId', Value: memberId || '' },
            { Name: 'custom:groupNumber', Value: groupNumber || '' },
            { Name: 'custom:dob', Value: dob || '' },
            { Name: 'custom:insuranceProvider', Value: insuranceProvider || '' },
            { Name: 'custom:mobileNumber', Value: mobileNumber || '' },
            { Name: 'custom:streetAddress', Value: streetAddress || '' },
            { Name: 'custom:apartmentNumber', Value: apartmentNumber || '' },
            { Name: 'custom:zipCode', Value: zipCode || '' },
            { Name: 'custom:city', Value: city || '' },
            { Name: 'custom:state', Value: state || '' },
          ].filter(attr => attr.Value);
    
         
          const response = await cognito
            .signUp({
              ClientId: POOL_DATA.COGNITO_APP_CLIENT_ID,
              Username: username,
              Password: password,
              SecretHash: secretHash,
              UserAttributes: userAttributes,
            })
            .promise();
    
         
          return {
            username,
            email,
            memberId,
            groupNumber,
            dob,
            firstName,
            lastName,
            insuranceProvider,
            mobileNumber,
            streetAddress,
            apartmentNumber,
            zipCode,
            city,
            state,
            UserConfirmed:response.UserConfirmed,
            UserSub:response.UserSub
          };
        }catch(err){
            console.log(err)
        }
        },
        signIn: async (_: any, args: SignInArgs): Promise<SignInResponse> => {
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
        // logout: async (_: any, args: LogoutArgs): Promise<LogoutResponse> => {
        //     const { token } = args;
        //     let data: LogoutResponse = { message: '', error: null };
      
        //     try {
        //       const cognito = new AWS.CognitoIdentityServiceProvider();
        //       await cognito.globalSignOut({ AccessToken: token }).promise();
        //       data.message = "User successfully logged out!";
        //     } catch (err) {
        //       console.error(err);
        //       data.message = "Error during logout.";
        //       data.error = err as unknown as Record<string, unknown>;
        //     }
      
        //     return data;
        //   }
      }
  }
  