/* 簡便化のため、containers, components に分割することを省略しています。 */

import * as React from "react";
import { useCallback, useState } from "react";
import {
  CognitoUserAttribute,
  ISignUpResult,
  CognitoUser
} from "amazon-cognito-identity-js";

import { userPool } from "../cognito";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const onChangeEmail = useCallback(e => {
    setEmail(e.currentTarget.value);
  }, []);

  const [password, setPassword] = useState("");
  const onChangePassword = useCallback(e => {
    setPassword(e.currentTarget.value);
  }, []);

  const [userSignedUp, setUserSignedUp] = useState(false);

  const [confirmation, setConfirmation] = useState("");
  const onConfirmationChange = useCallback(e => {
    setConfirmation(e.currentTarget.value);
  }, []);

  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(
    userPool.getCurrentUser()
  );

  const onSignUpSubmit = useCallback(
    e => {
      e.preventDefault();
      const attributes = [
        new CognitoUserAttribute({
          Name: "email",
          Value: email
        })
      ];

      userPool.signUp(
        email,
        password,
        attributes,
        [],
        (err: any, result?: ISignUpResult) => {
          if (err) {
            console.error(err);
            return;
          }
          setCognitoUser(result!.user);
          setUserSignedUp(true);
        }
      );
    },
    [email, password]
  );

  const onConfirmationSubmit = useCallback(
    e => {
      e.preventDefault();

      if (!cognitoUser) {
        return console.error("cognito user is null");
      }

      cognitoUser.confirmRegistration(confirmation, true, (err, result) => {
        if (err) {
          alert(err.message);
          console.error(err);
          return;
        }
        alert(result);
      });
    },
    [cognitoUser, confirmation]
  );

  // if (cognitoUser != null) {
  //   cognitoUser.getSession((err: any, session: any) => {
  //     if (err) {
  //       console.log(err);
  //       alert(err);
  //       return;
  //     }
  //     console.log("session validity: " + session.isValid());
  //   });
  // }

  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <fieldset>
          <legend>User Info</legend>
          <div>
            Email: <input type="email" value={email} onChange={onChangeEmail} />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </fieldset>
        <button onClick={onSignUpSubmit}>Sign Up</button>
      </form>
      <h2>Confirmation Code</h2>
      {userSignedUp && (
        <span>Please check your email box and enter confirmation code.</span>
      )}
      <form>
        <fieldset>
          <legend>Code</legend>
          <div>
            <input
              type="text"
              value={confirmation}
              onChange={onConfirmationChange}
            />
          </div>
        </fieldset>
        <button onClick={onConfirmationSubmit}>Confirmation</button>
      </form>
    </>
  );
};
