import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import Icon from "./assets/images/Icon.png";
import { auth, provider } from "./firebase";
import { actionType } from "./reducer";
import { useStateValue } from "./reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src={Icon} />
        <div className="login_text">
          <h1>Sign in to Messenger</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
