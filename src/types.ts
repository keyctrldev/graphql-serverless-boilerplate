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

export type AddressInfo = {
  __typename?: 'AddressInfo';
  apartmentNumber?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  state: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type AddressInput = {
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  streetAddress: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  signUp?: Maybe<SignUpResponse>;
  updateUserProfile: UpdateUserProfileResponse;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};

export type ProfileInfoResponse = {
  __typename?: 'ProfileInfoResponse';
  address?: Maybe<AddressInfo>;
  groupNumber?: Maybe<Scalars['String']['output']>;
  memberId: Scalars['ID']['output'];
  mobileNumber?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  User?: Maybe<User>;
  Users?: Maybe<Array<Maybe<User>>>;
  claims?: Maybe<Array<Maybe<Claim>>>;
  userProfileInfo: ProfileInfoResponse;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClaimsArgs = {
  memberId: Scalars['String']['input'];
};


export type QueryUserProfileInfoArgs = {
  memberId: Scalars['ID']['input'];
};

export type SignUpInput = {
  address: AddressInput;
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  groupNumber: Scalars['String']['input'];
  insuranceProvider: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  memberId: Scalars['ID']['input'];
  mobileNumber: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type LookUpResponse = {
  __typename?: 'lookUpResponse';
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type UpdateUserProfileInput = {
  agreementAcceptance?: InputMaybe<Scalars['String']['input']>;
  memberId: Scalars['String']['input'];
};

export type UpdateUserProfileResponse = {
  __typename?: 'updateUserProfileResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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
  AddressInfo: ResolverTypeWrapper<AddressInfo>;
  AddressInput: AddressInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Claim: ResolverTypeWrapper<Claim>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ProfileInfoResponse: ResolverTypeWrapper<ProfileInfoResponse>;
  Query: ResolverTypeWrapper<{}>;
  SignUpInput: SignUpInput;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  lookUpResponse: ResolverTypeWrapper<LookUpResponse>;
  updateUserProfileInput: UpdateUserProfileInput;
  updateUserProfileResponse: ResolverTypeWrapper<UpdateUserProfileResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddressInfo: AddressInfo;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean']['output'];
  Claim: Claim;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  ProfileInfoResponse: ProfileInfoResponse;
  Query: {};
  SignUpInput: SignUpInput;
  SignUpResponse: SignUpResponse;
  String: Scalars['String']['output'];
  User: User;
  lookUpResponse: LookUpResponse;
  updateUserProfileInput: UpdateUserProfileInput;
  updateUserProfileResponse: UpdateUserProfileResponse;
};

export type AddressInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressInfo'] = ResolversParentTypes['AddressInfo']> = {
  apartmentNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'firstName' | 'id' | 'lastName' | 'phone'>>;
  signUp?: Resolver<Maybe<ResolversTypes['SignUpResponse']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updateUserProfile?: Resolver<ResolversTypes['updateUserProfileResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'input'>>;
};

export type ProfileInfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileInfoResponse'] = ResolversParentTypes['ProfileInfoResponse']> = {
  address?: Resolver<Maybe<ResolversTypes['AddressInfo']>, ParentType, ContextType>;
  groupNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mobileNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  Users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  claims?: Resolver<Maybe<Array<Maybe<ResolversTypes['Claim']>>>, ParentType, ContextType, RequireFields<QueryClaimsArgs, 'memberId'>>;
  userProfileInfo?: Resolver<ResolversTypes['ProfileInfoResponse'], ParentType, ContextType, RequireFields<QueryUserProfileInfoArgs, 'memberId'>>;
};

export type SignUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LookUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['lookUpResponse'] = ResolversParentTypes['lookUpResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserProfileResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['updateUserProfileResponse'] = ResolversParentTypes['updateUserProfileResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddressInfo?: AddressInfoResolvers<ContextType>;
  Claim?: ClaimResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProfileInfoResponse?: ProfileInfoResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  lookUpResponse?: LookUpResponseResolvers<ContextType>;
  updateUserProfileResponse?: UpdateUserProfileResponseResolvers<ContextType>;
};

