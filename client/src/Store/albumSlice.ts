import { createSlice } from "@reduxjs/toolkit";
import {
  addAlbum,
  loadAllAlbums,
  fetchAlbums,
  selectAlbum,
  fetchAlbum,
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
    loadAllAlbums,
    fetchAlbums,
    selectAlbum,
    fetchAlbum,
  },
});

export const albumActions = albumSlice.actions;

export default albumSlice;
