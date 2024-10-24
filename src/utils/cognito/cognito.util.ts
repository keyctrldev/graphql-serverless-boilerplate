import { createHmac } from "crypto";
import { POOL_DATA } from "../../constants";

// Environment variables for Cognito configuration
const CLIENT_SECRET = POOL_DATA.COGNITO_APP_CLIENT_SECRET;
const CLIENT_ID = POOL_DATA.COGNITO_APP_CLIENT_ID;
// const USER_POOL_ID = POOL_DATA.COGNITO_USER_POOL_ID!;

export const generateHash = (username: string): string => {
  const hasher = createHmac("sha256", CLIENT_SECRET);
  hasher.update(username + CLIENT_ID);
  const secretHash = hasher.digest("base64");

  return secretHash;
};
