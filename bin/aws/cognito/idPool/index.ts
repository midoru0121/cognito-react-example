import { CognitoIdentity } from "aws-sdk";

export const listIdentityPools = async (
  cognitoIdentity: CognitoIdentity,
  idPoolName: string
) => {
  const idPools = await cognitoIdentity
    .listIdentityPools({ MaxResults: 60 })
    .promise();

  const fileterd = idPools.IdentityPools!.filter(
    (pool) => pool.IdentityPoolName === idPoolName
  );

  if (fileterd.length) {
    return fileterd[0];
  }

  return null;
};

export const describeIdentityPool = (
  cognitoIdentity: CognitoIdentity,
  IdentityPoolId: string
) => cognitoIdentity.describeIdentityPool({ IdentityPoolId }).promise();

export const createIdentityPool = (
  cognitoIdentity: CognitoIdentity,
  IdentityPoolName: string,
  ProviderName: string,
  ClientId: string
) =>
  cognitoIdentity
    .createIdentityPool({
      AllowUnauthenticatedIdentities: true,
      CognitoIdentityProviders: [
        {
          ClientId,
          ProviderName,
          ServerSideTokenCheck: false
        }
      ],
      IdentityPoolName
    })
    .promise();
