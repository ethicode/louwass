// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = en chargement
  const token = localStorage.getItem('access'); // ou 'token' selon ce que tu stockes

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        // Pas de token = utilisateur non connecté
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get('http://localhost:8000/api/check-auth/', {
          headers: {
            Authorization: `Bearer ${token}` // Attention : pas "Bearer"
          }
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erreur d\'authentification :', error.response?.status);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Oooooo...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
