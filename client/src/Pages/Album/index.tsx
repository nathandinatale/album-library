import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import AlbumForm from "../../Components/AlbumForm";
import { albumActions } from "../../Redux/Store/albumSlice";
import { RootState } from "../../types";
import { Button, Card, CardContent, Typography } from "@mui/material";

const Album = () => {
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

  return (
    <Card>
      {selectedAlbum && (
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
        <Button onClick={handleEditMode}>Edit Album</Button>
      )}
      {editMode && <AlbumForm editAlbum={selectedAlbum} />}
    </Card>
  );
};

export default Album;
