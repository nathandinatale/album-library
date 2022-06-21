import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState, Album, AlbumPreviewProps } from "../../types";
import { TableRow, TableCell } from "@mui/material";
import Button from "@mui/material/Button";

export const AlbumPreview = ({ album }: AlbumPreviewProps) => {
  const [currAlbum, setAlbum] = useState(album);
  const [isOwnRental, setRented] = useState(false);

  const userId = useSelector((state: RootState) => state.user._id);

  useEffect(() => {
    if (userId === album._borrowerId) {
      setRented(true);
    }
  }, []);

  const handleRental = () => {
    const token = localStorage.getItem("token");
    console.log(`http://localhost:5000/api/v1/albums/${album._id}/borrow`);
    axios
      .put(
        `http://localhost:5000/api/v1/albums/${album._id}/borrow`,
        { days: 7 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const rentedAlbum: Album = response.data;
        setAlbum(rentedAlbum);
        setRented(true);
      });
  };

  const handleReturn = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/api/v1/albums/${album._id}/return`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const returnedAlbum: Album = response.data;
        setAlbum(returnedAlbum);
        setRented(false);
      });
  };

  return (
    <TableRow>
      <TableCell>
        <Link to={`/albums/${album._id}`}>{currAlbum.name}</Link>
      </TableCell>
      <TableCell>{currAlbum.artist}</TableCell>
      <TableCell>{currAlbum.publishedYear}</TableCell>
      <TableCell>{currAlbum.ISWC}</TableCell>
      {currAlbum.isAvailable && (
        <TableCell>
          {" "}
          <Button variant="outlined" color="success" onClick={handleRental}>
            Rent Now
          </Button>
        </TableCell>
      )}
      {!currAlbum.isAvailable && isOwnRental && (
        <TableCell>
          {" "}
          <Button variant="outlined" color="error" onClick={handleReturn}>
            Return Now{" "}
          </Button>
        </TableCell>
      )}
      {!currAlbum.isAvailable && !isOwnRental && (
        <TableCell>
          {" "}
          <Button variant="outlined" color="error" onClick={handleReturn}>
            Unavailable
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};
