// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email,
                password
            });
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            alert('Connexion réussie');
        } catch (err) {
            setError('Email ou mot de passe invalide');
        }
    };

    return (
        <div>
            <Navbar />
            <Container>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Se connecter</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Container>
        </div>
    );
}

export default Login;
