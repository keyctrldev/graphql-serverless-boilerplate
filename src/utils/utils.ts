import { FieldNode } from "graphql";
import { GraphQLResolveInfo } from 'graphql';

export const requiredFields = (info: GraphQLResolveInfo) => {
  const extractFields = (selections: readonly FieldNode[]): string[] => {
    return selections.flatMap((selection) => {
      const fieldName = selection.name.value;
      // If the field has nested selections, recursively extract them
      const nestedFields = selection.selectionSet
        ? extractFields(selection.selectionSet.selections as FieldNode[])
        : [];

      // Return the full projection expression for this field
      return nestedFields.length > 0
        ? nestedFields.map((nestedField) => `${fieldName}.${nestedField}`)
        : [fieldName];
    });
  };
  // accessing the value and storing it in the requestedFields variable.
  const requestedFields = info?.fieldNodes?.[0]?.selectionSet?.selections as
    | FieldNode[]
    | undefined;
  console.log(requestedFields);
  const projectionFields = requestedFields
    ? extractFields(requestedFields)
    : [];
  // Check if we successfully extracted the fields
  if (projectionFields.length === 0) {
    throw new Error("No fields specified in the query.");
  }
  const projectionExpression = projectionFields.join(", ");
  return projectionExpression;
};
