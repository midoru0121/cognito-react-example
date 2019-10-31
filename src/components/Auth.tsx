import * as React from "react";
import { useHistory } from "react-router";
import { isSignedIn } from "../cognito";

const AuthRequiredPaths = ["/"];

export const Auth: React.FC = ({ children }) => {
  const history = useHistory();

  const isAuthRequiredPath = AuthRequiredPaths.includes(
    history.location.pathname
  );

  const isInSignInPage = history.location.pathname === "/signin";
  const isNotInSignInPage = !isInSignInPage;
  const isLoggedIn = isSignedIn();
  const isNotLoggedIn = !isLoggedIn;

  if (isAuthRequiredPath && isNotInSignInPage && isNotLoggedIn) {
    history.replace("/signin");
  }

  if (isLoggedIn && isInSignInPage) {
    history.replace("/");
  }

  return <>{children}</>;
};
