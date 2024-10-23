import {CognitoIdentityProviderClient,SignUpCommand,ConfirmSignUpCommand} from '@aws-sdk/client-cognito-identity-provider';
import { generateHash } from "../utilities/cognito/cognito.util";
import { POOL_DATA } from "../constants";
import { QuerySignUpArgs, CognitoUserRegistrationResponse, QueryComfirmCognitoUserArgs, CognitoUserConfirmationResponse } from "../types";
import { CognitoError, handleCognitoError } from '../utilities/cognito/cognito.error';
   

export const cognitoUserResolver = {
    Query: {
        signUp: async (_: any, args: QuerySignUpArgs): Promise<void | CognitoUserRegistrationResponse > => {          
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
          
          const cognito = new CognitoIdentityProviderClient({region:'us-east-1'});
         
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
            { Name: 'phone_number', Value: mobileNumber },
            { Name: 'custom:streetAddress', Value: streetAddress || '' },
            { Name: 'custom:apartmentNumber', Value: apartmentNumber || '' },
            { Name: 'custom:zipCode', Value: zipCode || '' },
            { Name: 'custom:city', Value: city || '' },
            { Name: 'custom:state', Value: state || '' },
          ].filter(attr => attr.Value);
    
          try {
            const command = new SignUpCommand({
              ClientId: POOL_DATA.COGNITO_APP_CLIENT_ID,
              Username: username,
              Password: password,
              SecretHash: secretHash,
              UserAttributes: userAttributes,
            })
          const response = await cognito.send(command)
          return {
            username,
            userConfirmed:response.UserConfirmed,
            userSub:response.UserSub,
            codeDeliveryDetails:response.CodeDeliveryDetails
          };
        }catch(err){
            console.log(err);
          
        }
        },
        comfirmCognitoUser: async(_:any,args:QueryComfirmCognitoUserArgs,):Promise<void | CognitoUserConfirmationResponse>=>{
          const {
            username,
           confirmationCode
          } = args;

          const cognito = new CognitoIdentityProviderClient({region:'us-east-1'});
          const secretHash = generateHash(username);
          const command = new ConfirmSignUpCommand({Username:username,ConfirmationCode:confirmationCode,ClientId:POOL_DATA.COGNITO_APP_CLIENT_ID,SecretHash:secretHash});
          try{
            const response = await cognito.send(command)
            return {status:200,message:"User confirmed"}
          }catch(err){
            console.log(err);
            throw handleCognitoError(err as CognitoError);          }
        }
      }
  }
  