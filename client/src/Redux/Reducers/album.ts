import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import store from "../Store";
import { albumActions } from "../Store/albumSlice";
import { AlbumState, Album } from "../../types";

const addAlbum = (state: AlbumState, action: PayloadAction<Album>) => {
  state.albums.push(action.payload);
};

const fetchAlbums = () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:5000/api/v1/albums", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const loadedAlbums: Album[] = [];
      response.data.map((album: Album) => loadedAlbums.push(album));
      store.dispatch(albumActions.loadAlbums(loadedAlbums));
    });
};

const fetchAlbumsPaginated = (
  state: AlbumState,
  action: PayloadAction<{ offset: number; count: number }>
) => {
  const { offset, count } = action.payload;
  const token = localStorage.getItem("token");
  axios
    .get(
      `http://localhost:5000/api/v1/albums/search?offset=${offset}&count=${count}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const loadedAlbums: Album[] = [];
      response.data.map((album: Album) => loadedAlbums.push(album));
      store.dispatch(albumActions.loadAlbums(loadedAlbums));
    });
};

const fetchAlbum = (
  state: AlbumState,
  action: PayloadAction<{ albumId: string }>
) => {
  const token = localStorage.getItem("token");
  const { albumId } = action.payload;
  axios
    .get(`http://localhost:5000/api/v1/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const fetchedAlbum = response.data as Album;
      store.dispatch(albumActions.selectAlbum(fetchedAlbum));
    });
};

const selectAlbum = (state: AlbumState, action: PayloadAction<Album>) => {
  state.selectedAlbum = action.payload;
};

const loadAlbums = (state: AlbumState, action: PayloadAction<Album[]>) => {
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
