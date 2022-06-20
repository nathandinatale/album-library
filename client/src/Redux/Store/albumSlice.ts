import { createSlice } from "@reduxjs/toolkit";

import {
  addAlbum,
  loadAlbums,
  fetchAlbums,
  selectAlbum,
  fetchAlbum,
  fetchAlbumsPaginated,
} from "../Reducers/album";
import { Album, AlbumState } from "../../types";

const albumsArray: Album[] = [];

export const initialAlbumState: AlbumState = {
  albums: albumsArray,
  loading: true,
  error: "",
  selectedAlbum: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState: initialAlbumState,
  reducers: {
    addAlbum,
    loadAlbums,
    fetchAlbums,
    selectAlbum,
    fetchAlbum,
    fetchAlbumsPaginated,
  },
});

export const albumActions = albumSlice.actions;

export default albumSlice;
