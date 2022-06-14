import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./albumSlice";

const store = configureStore({
  reducer: { album: albumSlice.reducer },
});

export default store;
