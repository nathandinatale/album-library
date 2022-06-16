import { useState, useEffect } from "react";
import axios from "axios";

const useCheckLogIn = async () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const backEndResponse = await axios.post(
    `http://localhost:5000/api/v1/users/check`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const isValidToken = backEndResponse.data;
  setLoggedIn(isValidToken);
  return loggedIn;
};

export default useCheckLogIn;
