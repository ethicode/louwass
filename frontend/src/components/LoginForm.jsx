// src/components/LoginForm.jsx
import React, { useState } from 'react';
import AuthService from '../services/AuthService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      setMessage('Connexion réussie !');
      window.location.reload(); // Ou navigate vers tableau de bord
    } catch (err) {
      setMessage('Échec de la connexion');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email ou nom d'utilisateur"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter</button>
      <p>{message}</p>
    </form>
  );
};

export default LoginForm;
