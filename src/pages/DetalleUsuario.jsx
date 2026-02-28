// Componente para mostrar detalle completo de un usuario
// Obtiene los datos desde Redux según el id de la ruta
// Permite volver a la lista de usuarios

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Chip, Box } from "@mui/material";

const DetalleUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const usuario = useSelector((state) =>
    state.datos.lista.find((u) => u.id === Number(id))
  );

  if (!usuario) return <Typography>Usuario no encontrado</Typography>;

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5">Detalle del Usuario</Typography>

          <Typography><strong>Nombre:</strong> {usuario.name}</Typography>
          <Typography><strong>Email:</strong> {usuario.email}</Typography>
          <Typography><strong>Teléfono:</strong> {usuario.phone}</Typography>

          <Box mt={2}>
            <Chip label={usuario.company?.name || "Sin empresa"} color="primary" />
          </Box>

          <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
            Volver
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetalleUsuario;