import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ListaPage from "./pages/ListaPage";
import CrearUsuario from "./pages/CrearUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import DetalleUsuario from "./pages/DetalleUsuario";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ListaPage />} />
        <Route path="/crear" element={<CrearUsuario />} />
        <Route path="/editar/:id" element={<EditarUsuario />} />
        <Route path="/detalle/:id" element={<DetalleUsuario />} />
      </Route>
    </Routes>
  );
}

export default App;