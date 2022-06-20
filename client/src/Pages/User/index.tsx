import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "../../Redux/Store/userSlice";
import { RootState } from "../../types";
import { TextField, Button, Box } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import classes from "./User.module.scss";

const User = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSubmit = () => {
    if (id) {
      dispatch(userActions.updateUser({ userId: id, firstName: name }));
    }
  };

  return (
    <Card className={classes.formContainer}>
      <CardContent>
        <Typography variant="h3">Username: {user.userName}</Typography>
        <Typography variant="h4">Email: {user.userEmail}</Typography>
        <Typography variant="h4">Role: {user.role}</Typography>
        <Box className={classes.edit} component="form" onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Edit user name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            error={!name}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default User;
