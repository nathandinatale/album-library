import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Routes from "./RouterRoutes";
import { userActions } from "./Redux/Store/userSlice";
import { Role } from "./types";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") as string;
  const role = localStorage.getItem("role") as Role;

  useEffect(() => {
    dispatch(userActions.checkLogin());
    if (!token || !role) {
      navigate("/");
    }
  }, []);

  return <>{<Routes token={token} role={role} />}</>;
}
