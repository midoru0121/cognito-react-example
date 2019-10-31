import { CognitoIdentityServiceProvider } from "aws-sdk";

export const listUserPoolClients = async (
  cognitoProvider: CognitoIdentityServiceProvider,
  UserPoolId: string
) => {
  const clients = await cognitoProvider
    .listUserPoolClients({
      UserPoolId
    })
    .promise();

  if (clients.UserPoolClients!.length) {
    return clients.UserPoolClients![0];
  }

  return null;
};

export const describeUserPoolClient = (
  cognitoProvider: CognitoIdentityServiceProvider,
  ClientId: string,
  UserPoolId: string
) =>
  cognitoProvider
    .describeUserPoolClient({
      ClientId,
      UserPoolId
    })
    .promise();

export const createUserPoolClient = (
  cognitoProvider: CognitoIdentityServiceProvider,
  UserPoolId: string,
  ClientName: string
) =>
  cognitoProvider
    .createUserPoolClient({
      ClientName,
      UserPoolId,
      GenerateSecret: false,
      ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH"]
    })
    .promise();
