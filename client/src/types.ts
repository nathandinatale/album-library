import { Reducer } from "@reduxjs/toolkit";
import store from "./Redux/Store";

export type Role = "ADMIN" | "USER";

export type AlbumProps = {
  name: string;
};

export type RouterRoutesProps = {
  token: string;
  role: Role;
};

export type AlbumPreviewProps = {
  album: Album;
};

export type SearchProps = {
  setQuery: Function;
};

export type Album = {
  ISWC: number;
  artist: string;
  collaborators: string[];
  genres: string[];
  isAvailable: boolean;
  lastBorrowedDate: Date | null;
  name: string;
  publishedYear: number;
  returnDate: Date | null;
  _borrowerId: string | null;
  _id: string;
  __v?: number | null;
};

export type User = {
  email: string;
  firstName: string;
  lastName?: string | null;
  role: Role;
  __v?: number | null;
  _id: string;
};

export type RootState = ReturnType<typeof store.getState>;

export type UserState = {
  userName: string;
  userEmail: string;
  _id: string;
  role: Role | null;
  loggedIn: boolean;
  selectedUser: User | null;
};

export type AlbumState = {
  albums: Album[];
  loading: boolean;
  error: string;
  selectedAlbum: Album | null;
};
