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

