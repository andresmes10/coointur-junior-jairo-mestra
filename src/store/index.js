// Punto de entrada de la aplicación React
// Configura Redux, Router y AG Grid

import { configureStore } from "@reduxjs/toolkit";
import datosReducer from "./slices/datosSlice";

export const store = configureStore({
  reducer: {
    datos: datosReducer
  }
});