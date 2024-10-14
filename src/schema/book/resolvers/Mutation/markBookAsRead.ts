
        import type   { MutationResolvers } from './../../../types.generated';
        export const markBookAsRead: MutationResolvers['markBookAsRead'] = async (parent, args, context) => {
                const { dynamoDB } = context;
              
                const params = {
                  TableName: 'BooksTable',
                  Key: { id: args.id },
                  UpdateExpression: 'set isRead = :isRead',
                  ExpressionAttributeValues: {
                    ':isRead': true,
                  },
                  ReturnValues: 'ALL_NEW',
                };
              
                const result = await dynamoDB.update(params);
                
                if (!result.Attributes) {
                  throw new Error(`Book with ID ${args.id} not found`);
                }
              
                return result.Attributes;
              };