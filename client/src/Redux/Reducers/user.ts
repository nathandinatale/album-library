import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import store from "../Store";
import { userActions, initialUserState } from "../Store/userSlice";
import { UserState, User } from "../../types";

const signIn = (state: UserState, action: PayloadAction<User>) => {
  if (action.payload) {
    console.log("user: ", action.payload);
    const { email, role, _id, firstName } = action.payload;
    state.userName = firstName;
    state.userEmail = email;
    state.role = role;
    state._id = _id;
    state.loggedIn = true;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    state.loggedIn = false;
  }
};

const signOut = (state: UserState) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  state = initialUserState;
};

const checkLogin = (state: UserState) => {
  const token = localStorage.getItem("token");
  axios
    .post(
      `http://localhost:5000/api/v1/users/check`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((backEndResponse) => {
      // would it be better to explicitly destructure from the response here?
      console.log(backEndResponse.data);
      const user: User = backEndResponse.data;
      store.dispatch(userActions.signIn(user));
    });
};

const fetchUser = (
  state: UserState,
  action: PayloadAction<{ userId: string }>
) => {
  const token = localStorage.getItem("token");
  const { userId } = action.payload;
  axios
    .get(`http://localhost:5000/api/v1/albums/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const fetchedUser: User = response.data;
      store.dispatch(userActions.selectUser(fetchedUser));
    });
};

const updateUser = (
  state: UserState,
  action: PayloadAction<{ userId: string; firstName: string }>
) => {
  const token = localStorage.getItem("token");
  const { userId, firstName } = action.payload;
  console.log(userId);
  axios
    .put(
      `http://localhost:5000/api/v1/users/${userId}`,
      { firstName },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const updatedUser: User = response.data;
      store.dispatch(userActions.signIn(updatedUser));
    });
};

const selectUser = (state: UserState, action: PayloadAction<User>) => {
  state.selectedUser = action.payload;
};

export { signIn, checkLogin, fetchUser, selectUser, updateUser, signOut };
