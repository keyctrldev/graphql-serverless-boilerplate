import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Claim = {
  __typename?: 'Claim';
  claimDate?: Maybe<Scalars['String']['output']>;
  claimId?: Maybe<Scalars['String']['output']>;
  claimStatus?: Maybe<Scalars['String']['output']>;
  medicationCost?: Maybe<Scalars['Int']['output']>;
  medicationName?: Maybe<Scalars['String']['output']>;
  memberId?: Maybe<Scalars['String']['output']>;
  memberPaid?: Maybe<Scalars['Int']['output']>;
  planPaid?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  claims?: Maybe<Array<Maybe<Claim>>>;
  signIn?: Maybe<Tokens>;
  signOut?: Maybe<SignOutResponse>;
  signUp?: Maybe<User>;
};


export type QueryClaimsArgs = {
  memberId: Scalars['String']['input'];
};


export type QuerySignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QuerySignOutArgs = {
  token: Scalars['String']['input'];
};


export type QuerySignUpArgs = {
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  groupNumber?: InputMaybe<Scalars['String']['input']>;
  insuranceProvider?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  memberId?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  error?: Maybe<Scalars['JSON']['output']>;
  message: Scalars['String']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']['output']>;
  idToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  UserConfirmed?: Maybe<Scalars['Boolean']['output']>;
  UserSub?: Maybe<Scalars['String']['output']>;
  apartmentNumber?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  groupNumber?: Maybe<Scalars['String']['output']>;
  insuranceProvider?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  memberId?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Claim: ResolverTypeWrapper<Claim>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Query: ResolverTypeWrapper<{}>;
  SignOutResponse: ResolverTypeWrapper<SignOutResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tokens: ResolverTypeWrapper<Tokens>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Claim: Claim;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Query: {};
  SignOutResponse: SignOutResponse;
  String: Scalars['String']['output'];
  Tokens: Tokens;
  User: User;
};

export type ClaimResolvers<ContextType = any, ParentType extends ResolversParentTypes['Claim'] = ResolversParentTypes['Claim']> = {
  claimDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  claimId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  claimStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  medicationCost?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  medicationName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberPaid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  planPaid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  claims?: Resolver<Maybe<Array<Maybe<ResolversTypes['Claim']>>>, ParentType, ContextType, RequireFields<QueryClaimsArgs, 'memberId'>>;
  signIn?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType, RequireFields<QuerySignInArgs, 'password' | 'username'>>;
  signOut?: Resolver<Maybe<ResolversTypes['SignOutResponse']>, ParentType, ContextType, RequireFields<QuerySignOutArgs, 'token'>>;
  signUp?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerySignUpArgs, 'email' | 'firstName' | 'lastName' | 'password' | 'username'>>;
};

export type SignOutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignOutResponse'] = ResolversParentTypes['SignOutResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  UserConfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  UserSub?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  apartmentNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groupNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  insuranceProvider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobileNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Claim?: ClaimResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  SignOutResponse?: SignOutResponseResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

