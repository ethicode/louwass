import api from "../API/axios";

export const getCategories = () => api.get("/categories/");
export const getCategoryById = (id) => api.get(`/categories/${id}/`);
export const getListingByCategory = (id) => api.get(`/categories/${id}/listings`);
