import * as AWS from "aws-sdk";
require("dotenv").config();

AWS.config.update({ region: process.env.REACT_APP_AWS_REGION });

export const USER_POOL_NAME = process.env.REACT_APP_USER_POOL_NAME || "";
export const USER_POOL_CLIENT_NAME =
  process.env.REACT_APP_USER_POOL_CLIENT_NAME || "";
export const REGION = process.env.REACT_APP_AWS_REGION || "";
export const ID_POOL_NAME = process.env.REACT_APP_ID_POOL_NAME || "";

[USER_POOL_NAME, USER_POOL_CLIENT_NAME, REGION, ID_POOL_NAME].forEach(
  envVariable => {
    if (envVariable === "") {
      throw new Error("Environment vartiable missing");
    }
  }
);

export const ID_POOL_ID = process.env.REACT_APP_ID_POOL_ID || "";
export const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID || "";
