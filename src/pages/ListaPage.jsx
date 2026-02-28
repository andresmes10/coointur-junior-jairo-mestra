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

  const { lista, loading, error, mensaje } = useSelector(
    (state) => state.datos
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        dispatch(clearMensaje());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mensaje, dispatch]);

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

      {!loading && !error && <TablaDatos datos={lista} />}

      <Snackbar open={!!mensaje} message={mensaje} />
    </>
  );
};

export default ListaPage;