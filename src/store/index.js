import { configureStore } from "@reduxjs/toolkit";
import datosReducer from "./slices/datosSlice";

export const store = configureStore({
  reducer: {
    datos: datosReducer
  }
});