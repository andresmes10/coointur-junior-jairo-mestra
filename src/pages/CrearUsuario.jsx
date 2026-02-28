import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/slices/datosSlice";
import { TextField, Button, Box, Stack } from "@mui/material";

const CrearUsuario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const [errores, setErrores] = useState({});

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    dispatch(
      addUser({
        id: Date.now(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: { name: form.company || "Sin empresa" }
      })
    );

    navigate("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errores.name}
          helperText={errores.name}
        />

        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errores.email}
          helperText={errores.email}
        />

        <TextField
          label="Teléfono"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <TextField
          label="Empresa"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="success">
            Guardar
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CrearUsuario;