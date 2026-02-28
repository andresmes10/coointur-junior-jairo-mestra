// Layout alternativo de la aplicación
// - Barra superior con título clickable para volver al inicio
// - Contenedor principal para las páginas usando <Outlet />
// Puede servir para diferenciar secciones o roles de usuario

import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Panel de Gestión - COOINTUR
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;