import api from "../API/axios";

export const getListings = () => api.get("/listings/");
export const getMyListings = () => api.get("/my-listings/");
export const getListingById = (id) => api.get(`/listings/${id}/`);
export const addListingsForm = () => api.get("/listings/publier");
export const searchListings = (query) => api.get(`/listings/?title=${query}`);



export const fdetchMyListings = async () => {
  const token = localStorage.getItem('access'); // ou autre selon ton stockage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/my-listings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // 🔑 très important
      },
    });

    if (response.status === 401) {
      console.error('Non autorisé : le token est manquant ou invalide.');
      return;
    }

    const data = await response.json();
    console.log('Mes listings :', data);
    return data;
  } catch (error) {
    console.error('Erreur lors du fetch :', error);
  }
};

export const fetchMyListings = async () => {
  const token = localStorage.getItem("access");
    const response = await fetch('http://127.0.0.1:8000/api/my-listings/', {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur d'authentification");
  }

  return await response.json(); // ✅ retourne directement les données
};