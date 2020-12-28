import React, { useContext } from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";
import { UserContext } from "./UserContext";
import { auth, provider } from "./firebase";

const Login = () => {
  const [user, setUser] = useContext(UserContext);

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => setUser(result))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__image">
          <img
            src="https://textus.com/wp-content/uploads/2018/10/TextUs-Messaging-Icons.png"
            alt=""
          />
        </div>
        <div className="login__button">
          {" "}
          <Button onClick={login}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
