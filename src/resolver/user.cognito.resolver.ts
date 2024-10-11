import AWS from 'aws-sdk';
import { generateHash } from "../utilities/cognito/cognito.util";
import { POOL_DATA } from "../constants";
import { QuerySignUpArgs, CognitoUserRegistrationResponse, QueryComfirmCognitoUserArgs, CognitoUserConfirmationResponse } from "../types";
import { CognitoError, handleCognitoError } from '../utilities/cognito/cognito.error';


AWS.config.update({ region: 'us-east-1' });   

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
            { Name: 'phone_number', Value: mobileNumber },
            { Name: 'custom:streetAddress', Value: streetAddress || '' },
            { Name: 'custom:apartmentNumber', Value: apartmentNumber || '' },
            { Name: 'custom:zipCode', Value: zipCode || '' },
            { Name: 'custom:city', Value: city || '' },
            { Name: 'custom:state', Value: state || '' },
          ].filter(attr => attr.Value);
    
          try {
          const response = await cognito
            .signUp({
              ClientId: POOL_DATA.COGNITO_APP_CLIENT_ID,
              Username: username,
              Password: password,
              SecretHash: secretHash,
              UserAttributes: userAttributes,
            })
            .promise();
            console.log(response,"----------------------------");
          return {
            UserConfirmed:response.UserConfirmed,
            UserSub:response.UserSub,
            CodeDeliveryDetails:response.CodeDeliveryDetails
          };
        }catch(err){
            console.log(err);
          
        }
        },
        comfirmCognitoUser: async(_:any,args:QueryComfirmCognitoUserArgs,):Promise<void | CognitoUserConfirmationResponse>=>{
          const {
            username,
           ConfirmationCode
          } = args;

          const cognito = new AWS.CognitoIdentityServiceProvider();
          const secretHash = generateHash(username);

          try{
            const response = await cognito.confirmSignUp({Username:username,ConfirmationCode,ClientId:POOL_DATA.COGNITO_APP_CLIENT_ID,SecretHash:secretHash}).promise();
            console.log(response);
            return {status:200,message:"User confirmed"}
          }catch(err){
            console.log(err);
            throw handleCognitoError(err as CognitoError);          }
        }
      }
  }
  