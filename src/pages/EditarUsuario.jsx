import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../store/slices/datosSlice";
import { TextField, Button, Box, Stack } from "@mui/material";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usuario = useSelector((state) =>
    state.datos.lista.find((u) => u.id === Number(id))
  );

  const [form, setForm] = useState({
    name: usuario?.name || "",
    email: usuario?.email || "",
    phone: usuario?.phone || "",
    company: usuario?.company?.name || ""
  });

  const [errores, setErrores] = useState({});

  if (!usuario) return <p>Usuario no encontrado</p>;

  const validar = () => {
    const nuevosErrores = {};

    if (!form.name.trim()) {
      nuevosErrores.name = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nuevosErrores.email = "El email no es válido";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    dispatch(
      updateUser({
        id: usuario.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: { name: form.company }
      })
    );

    navigate("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={!!errores.name}
          helperText={errores.name}
        />

        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errores.email}
          helperText={errores.email}
        />

        <TextField
          label="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <TextField
          label="Empresa"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="warning">
            Guardar Cambios
          </Button>

          <Button
  variant="outlined"
  color="inherit"
  onClick={() => {
    dispatch(clearMensaje()); // limpiar cualquier mensaje pendiente
    navigate("/");
  }}
>
  Cancelar
</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditarUsuario;