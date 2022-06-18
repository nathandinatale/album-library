import { createSlice } from "@reduxjs/toolkit";
import {
  addAlbum,
  loadAlbums,
  fetchAlbums,
  selectAlbum,
  fetchAlbum,
  fetchAlbumsPaginated,
} from "../Actions/album";

const albumsArray: any[] = [];
//const initialAlbumState = { loadedAlbums: albums };

const albumSlice = createSlice({
  name: "album",
  initialState: {
    albums: albumsArray,
    loading: true,
    error: "",
    selectedAlbum: null,
  },
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
