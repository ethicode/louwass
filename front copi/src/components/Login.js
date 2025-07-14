// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      });

      const { token, user_id, username: userName } = response.data;
      localStorage.setItem('token', token); // Sauvegarde token
      onLogin({ token, user_id, userName });
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <Container>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2>Connexion</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
