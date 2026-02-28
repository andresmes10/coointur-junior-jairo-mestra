// Funciones para interactuar con la API de usuarios
// - fetchUsers: obtiene la lista de usuarios desde jsonplaceholder.typicode.com
// Se puede extender para otras operaciones si se conecta a un backend real

import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};