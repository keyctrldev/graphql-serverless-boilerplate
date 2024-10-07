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
  