import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "../Actions/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userEmail: "",
    role: null,
  },
  reducers: {
    signIn,
  },
});

export const userActions = userSlice.actions;

export default userSlice;
