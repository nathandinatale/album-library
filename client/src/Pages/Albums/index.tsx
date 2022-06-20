import React, { useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { AlbumPreview } from "../../Components/AlbumPreview";
import { albumActions } from "../../Redux/Store/albumSlice";
import { userActions } from "../../Redux/Store/userSlice";
import Search from "../../Components/Search";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableFooter,
  Button,
} from "@mui/material";
import { Role, Album, RootState } from "../../types";

export const SearchContext = createContext<string>("");

// Too much being done here, should split up into seperate components
const Albums = () => {
  const [query, setQuery] = useState("");
  const searchQuery = query.toLowerCase();

  const role = localStorage.getItem("role") as Role;

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadedAlbums = useSelector((state: RootState) => state.album.albums);
  const userId = useSelector((state: RootState) => state.user._id);

  useEffect(() => {
    dispatch(userActions.checkLogin());
    dispatch(
      albumActions.fetchAlbumsPaginated({ offset: page * count, count: count })
    );
  }, [page, count]);

  const checkQueryMatches = (array: any[]) => {
    return array.filter(
      (album: Album) =>
        album.name.toLowerCase().includes(searchQuery) ||
        album.artist.toLowerCase().includes(searchQuery) ||
        album.ISWC.toString().includes(searchQuery)
    );
  };

  const mapResults = (array: any[]) => {
    return array.map((album: any) => (
      <AlbumPreview key={album.name} album={album} />
    ));
  };

  const handleLogout = () => {
    dispatch(userActions.signOut());
    navigate("/");
  };

  const handlePageSwitch = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCount(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headers = [
    "Album Name",
    "Artist",
    "Year Published",
    "ISWC",
    "Rental Status",
  ];

  return (
    <SearchContext.Provider value={query}>
      <Link to={`/users/${userId}`}>My Profile</Link>
      {role === "ADMIN" && <Link to={"/dashboard"}> Dashboard</Link>}
      <Search setQuery={setQuery} />
      <Button onClick={handleLogout}>Logout</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchQuery
              ? mapResults(checkQueryMatches(loadedAlbums))
              : mapResults(loadedAlbums)}
          </TableBody>
          <TableFooter>
            <TablePagination
              count={100}
              page={page}
              onPageChange={handlePageSwitch}
              rowsPerPage={count}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </SearchContext.Provider>
  );
};

export default Albums;
