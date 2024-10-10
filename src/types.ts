import { GraphQLResolveInfo } from 'graphql';
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

export type Medication = {
  __typename?: 'Medication';
  medName: Scalars['String']['output'];
  priorAuth: PriorAuth;
  quantity: Scalars['Int']['output'];
  refillDate: Scalars['String']['output'];
};

export type MedicationInput = {
  medName: Scalars['String']['input'];
  priorAuth: PriorAuthInput;
  quantity: Scalars['Int']['input'];
  refillDate: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};

export type PriorAuth = {
  __typename?: 'PriorAuth';
  status: Status;
  userId: Scalars['String']['output'];
};

export type PriorAuthInput = {
  status: StatusInput;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  User?: Maybe<User>;
  Users?: Maybe<Array<Maybe<User>>>;
  claims?: Maybe<Array<Maybe<Claim>>>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClaimsArgs = {
  memberId: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  status: Scalars['String']['output'];
};

export type StatusInput = {
  status: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  medications?: Maybe<Array<Medication>>;
  phone: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  medications?: InputMaybe<Array<MedicationInput>>;
  phone: Scalars['String']['input'];
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
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Medication: ResolverTypeWrapper<Medication>;
  MedicationInput: MedicationInput;
  Mutation: ResolverTypeWrapper<{}>;
  PriorAuth: ResolverTypeWrapper<PriorAuth>;
  PriorAuthInput: PriorAuthInput;
  Query: ResolverTypeWrapper<{}>;
  Status: ResolverTypeWrapper<Status>;
  StatusInput: StatusInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Claim: Claim;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Medication: Medication;
  MedicationInput: MedicationInput;
  Mutation: {};
  PriorAuth: PriorAuth;
  PriorAuthInput: PriorAuthInput;
  Query: {};
  Status: Status;
  StatusInput: StatusInput;
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
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

export type MedicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Medication'] = ResolversParentTypes['Medication']> = {
  medName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priorAuth?: Resolver<ResolversTypes['PriorAuth'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refillDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
};

export type PriorAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriorAuth'] = ResolversParentTypes['PriorAuth']> = {
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  Users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  claims?: Resolver<Maybe<Array<Maybe<ResolversTypes['Claim']>>>, ParentType, ContextType, RequireFields<QueryClaimsArgs, 'memberId'>>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  medications?: Resolver<Maybe<Array<ResolversTypes['Medication']>>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Claim?: ClaimResolvers<ContextType>;
  Medication?: MedicationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PriorAuth?: PriorAuthResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

