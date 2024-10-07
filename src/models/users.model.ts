export interface User {
  username: string;
  email: string;
  memberId?: string;
  groupNumber?: string;
  dob?: string;
  firstName: string;
  lastName: string;
  insuranceProvider?: string;
  mobileNumber?: string;
  streetAddress?: string;
  apartmentNumber?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  UserConfirmed: Boolean;
  UserSub: String;
}

export interface SignUpArgs {
  username: string;
  password: string;
  email: string;
  memberId?: string;
  groupNumber?: string;
  dob?: string;
  firstName: string;
  lastName: string;
  insuranceProvider?: string;
  mobileNumber?: string;
  streetAddress?: string;
  apartmentNumber?: string;
  zipCode?: string;
  city?: string;
  state?: string;
}

export interface SignInArgs {
  username: string;
  password: string;
}

export interface SignInResponse {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  message: string;
  customData: Record<string, unknown>;
}

export interface LogoutArgs {
  token: string;
}

export interface LogoutResponse {
  message: string;
  error: Record<string, unknown> | null;
}
