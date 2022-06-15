import React from "react";
import { Reducer } from "react";

import store from "../Store";

type role = "ADMIN" | "USER";

const signIn = (state: any, action: any) => {
  const { email, role } = action.payload;
  state.userName = action.payload.firstName;
  state.userEmail = action.payload.email;
  state.role = action.payload.role as role;
};

export { signIn };
