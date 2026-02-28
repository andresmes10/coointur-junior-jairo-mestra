import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/usersApi";
import { saveToLocalStorage, loadFromLocalStorage } from "../../utils/localStorage";

export const getUsers = createAsyncThunk(
  "datos/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUsers();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error al cargar usuarios");
    }
  }
);

const datosSlice = createSlice({
  name: "datos",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    mensaje: null,
    filtros: {
      busqueda: "",
      email: ""
    }
  },
  reducers: {
    addUser: (state, action) => {
      state.lista.push(action.payload);
      saveToLocalStorage(state.lista);
      state.mensaje = "Usuario creado correctamente";
    },

    updateUser: (state, action) => {
      state.lista = state.lista.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
      saveToLocalStorage(state.lista);
      state.mensaje = "Usuario actualizado correctamente";
    },

    deleteUser: (state, action) => {
      state.lista = state.lista.filter(
        (u) => u.id !== action.payload
      );
      saveToLocalStorage(state.lista);
      state.mensaje = "Usuario eliminado correctamente";
    },

    clearMensaje: (state) => {
      state.mensaje = null;
    },

    setBusqueda: (state, action) => {
      state.filtros.busqueda = action.payload;
    },

    setEmailFiltro: (state, action) => {
      state.filtros.email = action.payload;
    },

    limpiarFiltros: (state) => {
      state.filtros = { busqueda: "", email: "" };
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;

        const guardados = loadFromLocalStorage();

        if (guardados && guardados.length > 0) {
          state.lista = guardados;
        } else {
          state.lista = action.payload;
          saveToLocalStorage(action.payload);
        }
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  addUser,
  updateUser,
  deleteUser,
  clearMensaje,
  setBusqueda,
  setEmailFiltro,
  limpiarFiltros
} = datosSlice.actions;

export default datosSlice.reducer;