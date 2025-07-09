// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'token/', {
        username: email,  // Django utilise `username`, mais tu peux l'adapter
        password,
    });
    if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    login,
    logout,
    getCurrentUser,
};
