import React from "react";
import { Reducer } from "react";
import axios from "axios";

import store from "../Store";
import { userActions } from "../Store/userSlice";
import { stat } from "fs";

type role = "ADMIN" | "USER";

const signIn = (state: any, action: any) => {
  if (action.payload) {
    const { email, role, _id } = action.payload;
    state.userName = action.payload.firstName;
    state.userEmail = email;
    state.role = action.payload.role as role;
    state._id = action.payload._id as string;
    state.loggedIn = true;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    state.loggedIn = false;
  }
};

const checkLogin = (state: any) => {
  const token = localStorage.getItem("token");
  const backEndResponse = axios
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
      const user = backEndResponse.data;
      store.dispatch(userActions.signIn(user));
    });
};

const fetchUser = (state: any, action: any) => {
  const token = localStorage.getItem("token");
  const { userId } = action.payload;
  axios
    .get(`http://localhost:5000/api/v1/albums/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const fetchedUser = response.data;
      store.dispatch(userActions.selectUser(fetchedUser));
    });
};

const updateUser = (state: any, action: any) => {
  const token = localStorage.getItem("token");
  const { userId, ...rest } = action.payload;
  console.log(userId);
  axios
    .put(
      `http://localhost:5000/api/v1/users/${userId}`,
      { ...rest },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const updatedUser = response.data;
      store.dispatch(userActions.signIn(updatedUser));
    });
};

const selectUser = (state: any, action: any) => {
  state.selectedAlbum = action.payload;
};

export { signIn, checkLogin, fetchUser, selectUser, updateUser };
