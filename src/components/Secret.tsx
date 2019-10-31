import * as React from "react";
import { useEffect, useState } from "react";
import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import axios from "axios";

import { userPool } from "../cognito";

export const Secret = () => {
  const [cognitoUser, _] = useState<CognitoUser | null>(
    userPool.getCurrentUser()
  );

  const [jwtToken, setJwtToken] = useState("");
  const [lambdaResponse, setLambdaResponse] = useState("");

  const endpoint = process.env.REACT_APP_LAMBDA_ENDPOINT || "";

  cognitoUser!.getSession((err: any, session: CognitoUserSession) => {
    if (err) {
      return alert(err.message);
    }
    if (jwtToken === "") {
      setJwtToken(session.getIdToken().getJwtToken());
    }
  });

  useEffect(() => {
    (async () => {
      const result = await axios.get(endpoint, {
        headers: { Authorization: jwtToken }
      });
      setLambdaResponse(JSON.parse(result.data.body).message);
    })();
  }, []);

  return (
    <>
      <h1>Secret Page</h1>
      <h2>{lambdaResponse}</h2>
    </>
  );
};
