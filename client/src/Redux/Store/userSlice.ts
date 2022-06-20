import { createSlice } from "@reduxjs/toolkit";

import {
  signIn,
  checkLogin,
  selectUser,
  fetchUser,
  updateUser,
  signOut,
} from "../Reducers/user";
import { UserState } from "../../types";

export const initialUserState: UserState = {
  userName: "",
  userEmail: "",
  _id: "",
  role: null,
  loggedIn: false,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    signIn,
    checkLogin,
    selectUser,
    fetchUser,
    updateUser,
    signOut,
  },
});

export const userActions = userSlice.actions;

export default userSlice;
