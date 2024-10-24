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

export type AddressInfo = {
  __typename?: 'AddressInfo';
  apartmentNumber?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  state: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type AddressInput = {
  /** Apartment Number of the member */
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  /** Name of the City member belongs to */
  city: Scalars['String']['input'];
  /** Name of the State member belongs to */
  state: Scalars['String']['input'];
  /** Street Address of the member */
  streetAddress: Scalars['String']['input'];
  /** Zipcode of the place member belongs to */
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

export type CognitoUser = {
  __typename?: 'CognitoUser';
  apartmentNumber?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  groupNumber?: Maybe<Scalars['String']['output']>;
  insuranceProvider?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  memberId?: Maybe<Scalars['String']['output']>;
  mobileNumber: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type CognitoUserConfirmation = {
  __typename?: 'CognitoUserConfirmation';
  confirmationCode: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CognitoUserConfirmationResponse = {
  __typename?: 'CognitoUserConfirmationResponse';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type CognitoUserRegistrationResponse = {
  __typename?: 'CognitoUserRegistrationResponse';
  codeDeliveryDetails?: Maybe<Scalars['JSON']['output']>;
  userConfirmed?: Maybe<Scalars['Boolean']['output']>;
  userSub?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
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

export type SignInResponse = {
  __typename?: 'SignInResponse';
  customData?: Maybe<Scalars['JSON']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  tokens?: Maybe<Tokens>;
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  error?: Maybe<Scalars['JSON']['output']>;
  message: Scalars['String']['output'];
};

export type SignUpInput = {
  /** Address of the member */
  address: AddressInput;
  /** Date of birth of the member */
  dob: Scalars['String']['input'];
  /** Email Id of the member */
  email: Scalars['String']['input'];
  /** First Name of the member */
  firstName: Scalars['String']['input'];
  /** This is the groupNumber for a member */
  groupNumber: Scalars['String']['input'];
  /** Insurance Provider of the member */
  insuranceProvider: Scalars['String']['input'];
  /** Last Name of the member */
  lastName: Scalars['String']['input'];
  /** This is the memberId for a member */
  memberId: Scalars['ID']['input'];
  /** Mobile Number of the member */
  mobileNumber: Scalars['String']['input'];
  /** password */
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']['output']>;
  idToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
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
  /** agreementAcceptance is know whether the member accepted to the agreement */
  agreementAcceptance: Scalars['Boolean']['input'];
  /** This is the memberId for a member */
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
  CognitoUser: ResolverTypeWrapper<CognitoUser>;
  CognitoUserConfirmation: ResolverTypeWrapper<CognitoUserConfirmation>;
  CognitoUserConfirmationResponse: ResolverTypeWrapper<CognitoUserConfirmationResponse>;
  CognitoUserRegistrationResponse: ResolverTypeWrapper<CognitoUserRegistrationResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ProfileInfoResponse: ResolverTypeWrapper<ProfileInfoResponse>;
  Query: ResolverTypeWrapper<{}>;
  SignInResponse: ResolverTypeWrapper<SignInResponse>;
  SignOutResponse: ResolverTypeWrapper<SignOutResponse>;
  SignUpInput: SignUpInput;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tokens: ResolverTypeWrapper<Tokens>;
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
  CognitoUser: CognitoUser;
  CognitoUserConfirmation: CognitoUserConfirmation;
  CognitoUserConfirmationResponse: CognitoUserConfirmationResponse;
  CognitoUserRegistrationResponse: CognitoUserRegistrationResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  ProfileInfoResponse: ProfileInfoResponse;
  Query: {};
  SignInResponse: SignInResponse;
  SignOutResponse: SignOutResponse;
  SignUpInput: SignUpInput;
  SignUpResponse: SignUpResponse;
  String: Scalars['String']['output'];
  Tokens: Tokens;
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

export type CognitoUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoUser'] = ResolversParentTypes['CognitoUser']> = {
  apartmentNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groupNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  insuranceProvider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobileNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CognitoUserConfirmationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoUserConfirmation'] = ResolversParentTypes['CognitoUserConfirmation']> = {
  confirmationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CognitoUserConfirmationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoUserConfirmationResponse'] = ResolversParentTypes['CognitoUserConfirmationResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CognitoUserRegistrationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoUserRegistrationResponse'] = ResolversParentTypes['CognitoUserRegistrationResponse']> = {
  codeDeliveryDetails?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  userConfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSub?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

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

export type SignInResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInResponse'] = ResolversParentTypes['SignInResponse']> = {
  customData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignOutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignOutResponse'] = ResolversParentTypes['SignOutResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  CognitoUser?: CognitoUserResolvers<ContextType>;
  CognitoUserConfirmation?: CognitoUserConfirmationResolvers<ContextType>;
  CognitoUserConfirmationResponse?: CognitoUserConfirmationResponseResolvers<ContextType>;
  CognitoUserRegistrationResponse?: CognitoUserRegistrationResponseResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ProfileInfoResponse?: ProfileInfoResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInResponse?: SignInResponseResolvers<ContextType>;
  SignOutResponse?: SignOutResponseResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  lookUpResponse?: LookUpResponseResolvers<ContextType>;
  updateUserProfileResponse?: UpdateUserProfileResponseResolvers<ContextType>;
};

