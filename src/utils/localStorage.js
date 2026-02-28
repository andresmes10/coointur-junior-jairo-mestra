// Utilidades para guardar y cargar datos en localStorage
// - saveToLocalStorage(lista): guarda la lista de usuarios
// - loadFromLocalStorage(): carga la lista de usuarios si existe
// Facilita persistencia de datos entre recargas de la página

export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem("usuarios", JSON.stringify(data));
  } catch (error) {
    console.error("Error guardando en localStorage", error);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error cargando desde localStorage", error);
    return null;
  }
};