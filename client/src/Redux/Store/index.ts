import { configureStore } from "@reduxjs/toolkit";

import albumSlice from "./albumSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: { album: albumSlice.reducer, user: userSlice.reducer },
});

export default store;
