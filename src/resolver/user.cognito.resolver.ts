import AWS from 'aws-sdk';
import { generateHash } from "../utilities/cognito.util";
import { POOL_DATA } from "../constants";
import { QuerySignUpArgs, CognitoUser } from "../types";


AWS.config.update({ region: 'us-east-1' });   

export const cognitoUserResolver = {
    Query: {
        signUp: async (_: any, args: QuerySignUpArgs): Promise<void | CognitoUser > => {
       
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
            console.log(err);
            return;
        }
        }
      }
  }
  