// Tabla de usuarios usando AG Grid
// Muestra datos y acciones (ver, editar, eliminar)
// Maneja confirmación de eliminación y actualiza Redux

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/slices/datosSlice";

import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const TablaDatos = ({ datos }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const confirmarEliminacion = () => {
    dispatch(deleteUser(usuarioSeleccionado.id));
    setOpenDialog(false);
    setUsuarioSeleccionado(null);
  };

  const columnas = [
    { headerName: "ID", field: "id", width: 90 },
    { headerName: "Nombre", field: "name", flex: 1 },
    { headerName: "Email", field: "email", flex: 1 },
    { headerName: "Empresa", field: "company.name", flex: 1 },
    {
      headerName: "Acciones",
      width: 150,
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Ver">
            <IconButton
              color="primary"
              onClick={() => navigate(`/detalle/${params.data.id}`)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar">
            <IconButton
              color="warning"
              onClick={() => navigate(`/editar/${params.data.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton
              color="error"
              onClick={() => {
                setUsuarioSeleccionado(params.data);
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          theme="legacy"
          rowData={datos}
          columnDefs={columnas}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={false}
          animateRows
        />
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar a{" "}
          <strong>{usuarioSeleccionado?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmarEliminacion}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablaDatos;