import type { QueryResolvers } from './../../../types.generated'; // Adjust the import path

const book: NonNullable<QueryResolvers['book']> = async (parent, args, context) => {
  const { dynamoDB } = context;

  const params = {
    TableName: 'BooksTable',
    Key: { id: args.id },
  };

  const result = await dynamoDB.get(params);

  if (!result.Item) {
    throw new Error(`Book with ID ${args.id} not found`);
  }

  return result.Item; // Ensure this matches your Book type
};

// Export the resolver
export { book }; // Ensure this line is present
