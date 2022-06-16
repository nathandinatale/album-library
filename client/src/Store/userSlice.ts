import { createSlice } from "@reduxjs/toolkit";
import {
  signIn,
  checkLogin,
  selectUser,
  fetchUser,
  updateUser,
} from "../Actions/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userEmail: "",
    _id: "",
    role: null,
    loggedIn: false,
  },
  reducers: {
    signIn,
    checkLogin,
    selectUser,
    fetchUser,
    updateUser,
  },
});

export const userActions = userSlice.actions;

export default userSlice;
