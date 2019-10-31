import { CognitoIdentity, CognitoIdentityServiceProvider } from "aws-sdk";

import {
  createUserPool,
  describeUserPool,
  listUserPools,
  composeUserPoolProviderName
} from "./userPool";
import {
  listUserPoolClients,
  createUserPoolClient,
  describeUserPoolClient
} from "./userPoolClient";
import {
  listIdentityPools,
  createIdentityPool,
  describeIdentityPool
} from "./idPool";
import {
  USER_POOL_NAME,
  USER_POOL_CLIENT_NAME,
  REGION,
  ID_POOL_NAME
} from "./env";

(async () => {
  const cognitoProvider = new CognitoIdentityServiceProvider();

  // ユーザープールの作成
  const userPoolQueried = await listUserPools(cognitoProvider, USER_POOL_NAME);
  const userPool: CognitoIdentityServiceProvider.DescribeUserPoolResponse = userPoolQueried
    ? await describeUserPool(cognitoProvider, userPoolQueried.Id as string)
    : await createUserPool(cognitoProvider, USER_POOL_NAME);

  // ユーザープールクライアントの作成
  const userPoolClientQueried = await listUserPoolClients(
    cognitoProvider,
    userPool.UserPool!.Id as string
  );

  const targetUserPoolClient = userPoolClientQueried
    ? await describeUserPoolClient(
        cognitoProvider,
        userPoolClientQueried.ClientId as string,
        userPool!.UserPool!.Id as string
      )
    : await createUserPoolClient(
        cognitoProvider,
        userPool!.UserPool!.Id as string,
        USER_POOL_CLIENT_NAME
      );

  // IDプールの作成
  const cognitoIdentity = new CognitoIdentity();
  const idPoolQueried = await listIdentityPools(cognitoIdentity, ID_POOL_NAME);

  const providerName = composeUserPoolProviderName(REGION, userPool.UserPool!
    .Id as string);

  const idPool = idPoolQueried
    ? await describeIdentityPool(cognitoIdentity, idPoolQueried!
        .IdentityPoolId as string)
    : await createIdentityPool(
        cognitoIdentity,
        ID_POOL_NAME,
        providerName,
        targetUserPoolClient!.UserPoolClient!.ClientId as string
      );

  console.log(`IDENTITY_POOL_ID: ${idPool.IdentityPoolId}`);
  console.log(`USER_POOL_ID: ${userPool!.UserPool!.Id}`);
  console.log(`USER_POOL_ARN: ${userPool!.UserPool!.Arn}`);
  console.log(
    `USER_POOL_WEB_CLIENT_ID: ${targetUserPoolClient!.UserPoolClient!.ClientId}`
  );
})();
