/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { book as Query_book } from './book/resolvers/Query/book';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { markBookAsRead1 as Mutation_markBookAsRead1 } from './book/resolvers/Mutation/markBookAsRead1';
import    { Book } from './book/resolvers/Book';
import    { User } from './user/resolvers/User';
    export const resolvers: Resolvers = {
      Query: { book: Query_book,user: Query_user },
      Mutation: { markBookAsRead1: Mutation_markBookAsRead1 },
      
      Book: Book,
User: User
    }