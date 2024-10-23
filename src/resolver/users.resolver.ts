import { IResolvers } from "@graphql-tools/utils";
import { dynamoDB } from "../dynamodb";
import { FieldNode } from 'graphql';

export const userResolver: IResolvers = {
  Query: {
    User: async (_, { id ,}) => {
      const params = {
        TableName: "Users",
        Key: { id },
      };
  
      const result = await dynamoDB.get(params);
  
      // If no user is found, throw an error or return null
      if (!result.Item) {
        throw new Error(`User with ID ${id} not found`);
      }
  
      // Ensure that the 'id' field is present
      if (!result.Item.id) {
        throw new Error(`User 'id' field is missing for ID ${id}`);
      }
  
      return result.Item;
    },

    Users: async () => {
      const params = {
        TableName: "Users",
      };

      const result = await dynamoDB.scan(params);
      return result.Items; 
    },
    
    usersInformation: async (_, __, { }, info) => {
      // Extract the requested fields from the GraphQL query, filtering only FieldNode types
      const extractFields = (selections: readonly FieldNode[]): string[] => {
          return selections.flatMap(selection => {
              const fieldName = selection.name.value;
              // If the field has nested selections, recursively extract them
              const nestedFields = selection.selectionSet 
                  ? extractFields(selection.selectionSet.selections as FieldNode[])
                  : [];

              // Return the full projection expression for this field
                  return nestedFields.length > 0 
                  ? nestedFields.map(nestedField => `${fieldName}.${nestedField}`)
                  : [fieldName];
          });
      };
  // accessing the value and storing it in the requestedFields variable.
      const requestedFields = info?.fieldNodes?.[0]?.selectionSet?.selections as FieldNode[] | undefined;
      console.log(requestedFields)
      const projectionFields = requestedFields ? extractFields(requestedFields) : [];
      
      console.log(projectionFields);
  
      // Check if we successfully extracted the fields
      if (projectionFields.length === 0) {
          throw new Error('No fields specified in the query.');
      }
  
      const projectionExpression = projectionFields.join(', ');
      console.log(projectionExpression);
      const params = {
          TableName: "Users",
          ProjectionExpression: projectionExpression,
      };
  
      try {
          // Perform the DynamoDB scan operation with the ProjectionExpression
          const result = await dynamoDB.scan(params);
          console.log(`result: ${JSON.stringify(result.Items)}`);
          // Return the scanned items
          return result.Items;
          
      } catch (error) {
          // Error handling
          if (error instanceof Error) {
              throw new Error(`Failed to fetch specified fields: ${error.message}`);
          } else {
              throw new Error('An unknown error occurred');
          }
      }
  }
      },
  Mutation: {
    // Create a new user
    createUser: async (_, { id, firstName, lastName, email, phone }) => {
      const params = {
        TableName: "Users",
        Item: {
          id,
          firstName,
          lastName,
          email: {  // Store email as an object
            email: email.email,  // Extracting email from emailInput
            address: email.address,  // Extracting address from emailInput
          },
          phone,
        },
      };
  
      // Save the user to DynamoDB
      await dynamoDB.put(params);
  
      // Return the created user object
      return params.Item;
    },
  },
  
};
