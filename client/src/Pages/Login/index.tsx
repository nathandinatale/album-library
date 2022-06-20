import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Provider, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import store from "../../Redux/Store";
import { userActions } from "../../Redux/Store/userSlice";
import classes from "./Login.module.scss";
import { User, Role } from "../../types";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential;

    const backendResponse = await axios.post(
      `http://localhost:5000/google-login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    );
    const backendToken = backendResponse.data.token;
    const user: User = backendResponse.data.user;
    const role: Role = user.role;
    dispatch(userActions.signIn(user));

    // might be better to do this inside the signIn action
    // this page will be redirected to if a token is not found, so a new one can be generated and placed in LS
    localStorage.setItem("token", backendToken);
    localStorage.setItem("role", role);

    navigate("/albums");
  };

  const clientId =
    "1062296584596-ghe50cc3iifj9j52prqqar8844ggldii.apps.googleusercontent.com";
  return (
    <div className={classes.login}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSuccess} />
        </GoogleOAuthProvider>
      </Provider>
    </div>
  );
};

export default Login;
