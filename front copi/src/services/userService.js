import axios from "axios";
import api from "../API/axios";

export const getCMyAccount = () => api.get("/myaccount/");
export const myListings = () => api.get("/mes-publications/");
// export const getCategoryById = (id) => api.get(`/categories/${id}/`);
const API_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login/`, {
    email,
    password,
  });
  localStorage.setItem('access', response.data.access);
  localStorage.setItem('refresh', response.data.refresh);
  return response.data;
};

export const logout = async () => {
  const refresh = localStorage.getItem('refresh');
  try {
    await axios.post(`${API_URL}/logout/`, { refresh });
  } catch (err) {
    console.warn('Erreur logout côté serveur (peut être déjà expiré)');
  }
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export const fetchUser = async () => {
  const token = localStorage.getItem('access');
  console.log('Token JWT :', token); // 👈 Ajout
  if (!token) throw new Error('Token manquant');

  const response = await axios.get(`${API_URL}/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Utilisateur :', response.data);
  return response.data;
};
