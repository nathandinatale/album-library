import { useState } from "react";
import axios from "axios";

import { AlbumFormProps, Album } from "../../types";
import { TextField, Button, Box, Alert } from "@mui/material";

const AlbumForm = ({ editAlbum }: AlbumFormProps) => {
  const [name, setName] = useState("");
  const [iswc, setIswc] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [response, setResponse] = useState("");
  const [partialAlbum, setPartialAlbum] = useState({});

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const newAlbum = {
      name: name,
      ISWC: parseInt(iswc),
      artist: artist,
      publishedYear: parseInt(year),
      lastBorrowedDate: null,
      returnDate: null,
      _borrowerId: null,
      isAvailable: true,
    };
    axios
      .post(
        `http://localhost:5000/api/v1/albums`,
        { ...newAlbum },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => setResponse(response.data));
  };

  const handleEditAlbum = () => {
    const token = localStorage.getItem("token");
    // not sure if this is a good way to go about it, had some trouble trying to achieve what I wanted here
    const partialAlbum = {
      ...(name && { name: name }),
      ...(iswc && { ISWC: iswc }),
      ...(artist && { artist: artist }),
      ...(year && { publishedYear: year }),
    };
    if (editAlbum) {
      axios
        .put(
          `http://localhost:5000/api/v1/albums/${editAlbum._id}`,
          { ...partialAlbum },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => setResponse(response.data));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Album Name"
        required={editAlbum ? false : true}
        onChange={(e) => setName(e.target.value)}
        placeholder={editAlbum ? editAlbum.name : ""}
        value={name}
        error={!name}
      />
      <TextField
        id="artist"
        label="Primary Artist"
        required={editAlbum ? false : true}
        onChange={(e) => setArtist(e.target.value)}
        placeholder={editAlbum ? editAlbum.artist : ""}
        value={artist}
        error={!artist}
      />
      <TextField
        id="year"
        label="Year Published"
        type="number"
        required={editAlbum ? false : true}
        onChange={(e) => setYear(e.target.value)}
        placeholder={editAlbum ? editAlbum.publishedYear.toString() : ""}
        value={year}
        error={!year}
      />
      <TextField
        id="iswc"
        label="ISWC"
        required={editAlbum ? false : true}
        type="number"
        onChange={(e) => setIswc(e.target.value)}
        placeholder={editAlbum ? editAlbum.ISWC.toString() : ""}
        value={iswc}
        error={!iswc || iswc.length !== 8}
        helperText={iswc.length !== 8 && "ISWC must be 8 characters"}
      />
      {editAlbum ? (
        <Button onClick={handleEditAlbum}>Edit</Button>
      ) : (
        <Button onClick={handleSubmit}>Submit</Button>
      )}
      {response && editAlbum && (
        <Alert severity="success">Album was editted successfully!</Alert>
      )}
      {response && !editAlbum && (
        <Alert severity="success">Album was submitted successfully!</Alert>
      )}
    </Box>
  );
};

export default AlbumForm;
