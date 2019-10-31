import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || "",
  ClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || ""
};

export const userPool = new CognitoUserPool(poolData);

export const isSignedIn = () => userPool.getCurrentUser();
