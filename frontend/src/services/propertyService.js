import api from "../API/axios";

export const getProperties = () => api.get("/listings");
export const getPropertyById = (id) => api.get(`/listings/${id}/`);
export const login = (credentials) => api.post("/auth/login/", credentials);
export const register = (data) => api.post("/auth/register/", data);

export const getCategories = () => api.get("/categories/");
export const getCategoryById = (id) => api.get(`/categories/${id}/`);