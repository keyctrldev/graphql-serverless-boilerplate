import type   { QueryResolvers } from './../../../types.generated';

        export const user: NonNullable<QueryResolvers['user']> = async (_, { id }, { dataSources }) => {
          return await dataSources.userAPI.getUserById(id);
        };
        