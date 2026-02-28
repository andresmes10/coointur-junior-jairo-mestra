import { useDispatch, useSelector } from "react-redux";
import { setBusqueda, setEmailFiltro, limpiarFiltros } from "../store/slices/datosSlice";
import { TextField, Button, Box } from "@mui/material";

const FiltrosPanel = () => {
  const dispatch = useDispatch();
  const { busqueda, email } = useSelector((state) => state.datos.filtros);

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label="Buscar por nombre"
        value={busqueda}
        onChange={(e) => dispatch(setBusqueda(e.target.value))}
      />

      <TextField
        label="Filtrar por email"
        value={email}
        onChange={(e) => dispatch(setEmailFiltro(e.target.value))}
      />

      <Button variant="outlined" onClick={() => dispatch(limpiarFiltros())}>
        Limpiar
      </Button>
    </Box>
  );
};

export default FiltrosPanel;