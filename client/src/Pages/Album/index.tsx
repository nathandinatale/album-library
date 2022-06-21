import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import AlbumForm from "../../Components/AlbumForm";
import { albumActions } from "../../Redux/Store/albumSlice";
import { RootState } from "../../types";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";

// Probably would break up this component as well.
const Album = () => {
  const [open, setOpen] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const selectedAlbum = useSelector(
    (state: RootState) => state.album.selectedAlbum
  );
  const userRole = useSelector((state: RootState) => state.user.role);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      dispatch(albumActions.fetchAlbum({ albumId: id }));
    }
  }, []);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    setOpen(false);
    const token = localStorage.getItem("token");
    if (selectedAlbum) {
      axios
        .delete(`http://localhost:5000/api/v1/albums/${selectedAlbum._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response && setDeleted(true));
    }
  };

  return (
    <Card>
      {selectedAlbum && !isDeleted && (
        <>
          <CardContent>
            <Typography variant="h3" component="h2">
              {selectedAlbum.name}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5">Artist: {selectedAlbum.artist}</Typography>
            <Typography variant="h5">
              Year Published: {selectedAlbum.publishedYear}
            </Typography>
            <Typography variant="h5">ISWC: {selectedAlbum.ISWC}</Typography>
            <Typography variant="h5">
              Genres: {Object.values(selectedAlbum.genres)}
            </Typography>
            <Typography variant="h5">
              Available for Rent?: {selectedAlbum.isAvailable ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </>
      )}
      {userRole === "ADMIN" && (
        <>
          <Button onClick={handleEditMode}>Edit Album</Button>
          <Button onClick={handleClickOpen}> Delete Album</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {"Are you sure you want to delete this album?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will delete the entire album from the database for all
                users.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete}>Yes</Button>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {editMode && <AlbumForm editAlbum={selectedAlbum} />}
      {isDeleted && (
        <Alert severity="success">Album was deleted successfully!</Alert>
      )}
    </Card>
  );
};

export default Album;
