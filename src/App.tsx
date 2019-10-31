import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { SignUp } from "./components/SignUp";
import { Auth } from "./components/Auth";
import { NotFound } from "./components/NotFound";
import { SignIn } from "./components/SignIn";
import { Secret } from "./components/Secret";

const App = () => {
  return (
    <BrowserRouter>
      <Auth>
        <Switch>
          <Route component={Secret} path={"/"} exact />
          <Route component={SignUp} path={"/signup"} exact />
          <Route component={SignIn} path={"/signin"} exact />
          <Route component={NotFound} path={"/*"} />
        </Switch>
      </Auth>
    </BrowserRouter>
  );
};

export default App;
