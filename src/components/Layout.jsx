// Layout principal de la aplicación
// - Barra superior con título de la app
// - Contenedor principal para las páginas usando <Outlet />
// Se puede usar como base para agregar navegación o menú lateral

import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Panel Administrativo - Gestión de Usuarios
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;