// @ts-ignore
import React from "react";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Reducer } from "react";

import store from "../Store";
import { albumActions } from "../Store/albumSlice";
import { OfflineShareTwoTone } from "@mui/icons-material";

// improve typing here
const addAlbum = (state: any, action: any) => {
  console.log("This is executed");
  state.album.push(action.payload);
};

const fetchAlbums = () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:5000/api/v1/albums", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const loadedAlbums: any[] = [];
      response.data.map((album: any) => loadedAlbums.push(album));
      store.dispatch(albumActions.loadAlbums(loadedAlbums));
    });
};

const fetchAlbumsPaginated = (state: any, action: any) => {
  const { offset, count } = action.payload;
  const token = localStorage.getItem("token");
  axios
    .get(
      `http://localhost:5000/api/v1/albums/search?offset=${offset}&count=${count}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const loadedAlbums: any[] = [];
      response.data.map((album: any) => loadedAlbums.push(album));
      store.dispatch(albumActions.loadAlbums(loadedAlbums));
    });
};

const fetchAlbum = (state: any, action: any) => {
  console.log("this action is executed");
  const token = localStorage.getItem("token");
  const { albumId } = action.payload;
  axios
    .get(`http://localhost:5000/api/v1/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const fetchedAlbum = response.data;
      console.log(fetchedAlbum);
      store.dispatch(albumActions.selectAlbum(fetchedAlbum));
    });
};

const selectAlbum = (state: any, action: any) => {
  state.selectedAlbum = action.payload;
};

const loadAlbums = (state: any, action: any) => {
  state.albums = action.payload;
};

export {
  addAlbum,
  loadAlbums,
  fetchAlbums,
  selectAlbum,
  fetchAlbum,
  fetchAlbumsPaginated,
};
