import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { albumActions } from "../../Redux/Store/albumSlice";
import { RootState } from "../../types";
import { Card, CardContent, Typography } from "@mui/material";

const Album = () => {
  const dispatch = useDispatch();
  const selectedAlbum = useSelector(
    (state: RootState) => state.album.selectedAlbum
  );

  const { id } = useParams<{ id: string }>();
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(albumActions.fetchAlbum({ albumId: id }));
    }
  }, []);

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
    </Card>
  );
};

export default Album;
