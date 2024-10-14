
        import type   { QueryResolvers } from './../../../types.generated';

        export const user: QueryResolvers['user'] = async (_, { id }, { dataSources }) => {
          return await dataSources.userAPI.getUserById(id);
        };
        