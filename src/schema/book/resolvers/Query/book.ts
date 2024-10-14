import type { QueryResolvers } from "./../../../types.generated";
export const book: QueryResolvers["book"] = async (parent, args, context) => {
  const { dynamoDB } = context;

  const params = {
    TableName: "BooksTable",
    Key: { id: args.id },
  };

  const result = await dynamoDB.get(params);

  if (!result.Item) {
    throw new Error(`Book with ID ${args.id} not found`);
  }

  return result.Item;
};
