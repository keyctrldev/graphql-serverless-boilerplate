import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

// Helper functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Combined Directives Function
export function applyDirectives(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(schema, fieldConfig, 'upper')?.[0];
      const maskedDirective = getDirective(schema, fieldConfig, 'masked')?.[0];
      const validateEmailDirective = getDirective(schema, fieldConfig, 'validateEmail')?.[0];
      const deprecatedFieldDirective = getDirective(schema, fieldConfig, 'deprecatedField')?.[0];
      const defaultDirective = getDirective(schema, fieldConfig, 'default')?.[0];

      if (upperDirective || maskedDirective || validateEmailDirective || deprecatedFieldDirective || defaultDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          let result = await resolve(source, args, context, info);
          // Apply @upper directive
          if (upperDirective && typeof result === 'string') {
            result = result.toUpperCase();
            console.log(result);
          }
          // Apply @masked directive
          if (maskedDirective && typeof result === 'string') {
            result = result.replace(/.(?=.{4})/g, '#');
            console.log(result);
          }
          // Apply @validateEmail directive
          if (validateEmailDirective && typeof result === 'string' && !isValidEmail(result)) {
            throw new Error(`Invalid email format: ${result}`);
            
          }
          // Apply @deprecatedField directive
          if (deprecatedFieldDirective) {
            const reason = deprecatedFieldDirective.reason;
            // Set the deprecation reason in the field's configuration
            fieldConfig.deprecationReason = reason;
          }
          // Apply @default directive
          if ((result === null || result === undefined) && defaultDirective) {
            result = defaultDirective.value;
            console.log(result);
          }
          console.log(result);
          return result;
          
        };
      }
      return fieldConfig;
    },
  });
}
