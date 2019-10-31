import { CognitoIdentityServiceProvider } from "aws-sdk";

export const composeUserPoolProviderName = (
  region: string,
  userPoolId: string
) => `cognito-idp.${region}.amazonaws.com/${userPoolId}`;

export const listUserPools = async (
  cognitoProvider: CognitoIdentityServiceProvider,
  userPoolName: string
) => {
  const pools = await cognitoProvider
    .listUserPools({ MaxResults: 60 })
    .promise();
  const fileterd = pools.UserPools!.filter(pool => pool.Name === userPoolName);

  if (fileterd.length) {
    return fileterd[0];
  }

  return null;
};

/* 対象の名前でユーザープールを作成する */
export const createUserPool = (
  cognitoProvider: CognitoIdentityServiceProvider,
  userPoolName: string
) =>
  cognitoProvider
    .createUserPool({
      AutoVerifiedAttributes: ["email"],
      MfaConfiguration: "OFF", // Specifies MFA configuration details.
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireSymbols: true,
          RequireUppercase: true,
          TemporaryPasswordValidityDays: 30
        }
      },
      PoolName: userPoolName,
      Schema: [
        {
          AttributeDataType: "String",
          DeveloperOnlyAttribute: false,
          Mutable: true,
          Name: "email",
          Required: true
        }
      ],
      UsernameAttributes: ["email"]
    })
    .promise();

export const describeUserPool = (
  cognitoProvider: CognitoIdentityServiceProvider,
  UserPoolId: string
) => cognitoProvider.describeUserPool({ UserPoolId }).promise();
