// Punto de entrada principal de la aplicación React
// - Configura React 18 con createRoot
// - Envuelve la app con Redux Provider y BrowserRouter
// - Registra los módulos necesarios de AG Grid para las tablas
// - Aquí se inicializa toda la aplicación antes de renderizarla en el DOM

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

// ✅ REGISTRO OBLIGATORIO AG GRID
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);