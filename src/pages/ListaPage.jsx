// Página principal de gestión de usuarios
// Muestra tabla de usuarios, panel de filtros y botones de acción
// Aplica filtros en tiempo real y maneja mensajes de éxito/error

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, clearMensaje } from "../store/slices/datosSlice";
import TablaDatos from "../components/TablaDatos";
import FiltrosPanel from "../components/FiltrosPanel";
import { Button, Typography, Snackbar } from "@mui/material";

const ListaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lista, filtros, loading, error, mensaje } = useSelector(
    (state) => state.datos
  );

  // Cargar usuarios al montar el componente
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Limpiar mensaje después de 3 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        dispatch(clearMensaje());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mensaje, dispatch]);

  // Aplicar filtros de búsqueda y email
  const listaFiltrada = lista.filter((usuario) => {
    const nombreCoincide = usuario.name
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());
    const emailCoincide = usuario.email
      .toLowerCase()
      .includes(filtros.email.toLowerCase());
    return nombreCoincide && emailCoincide;
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/crear")}
        sx={{ mb: 2 }}
      >
        Crear Usuario
      </Button>

      <FiltrosPanel />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <TablaDatos datos={listaFiltrada} />}

      <Snackbar open={!!mensaje} message={mensaje} />
    </>
  );
};

export default ListaPage;