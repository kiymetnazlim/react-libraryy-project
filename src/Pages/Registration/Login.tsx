import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Container,
    Typography,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Varsayılan kullanıcı bilgileri
const DEFAULT_USER = {
    email: 'admin@example.com',
    password: '123456'
};

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // İlk kullanıcıyı localStorage'a kaydet
        if (!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(DEFAULT_USER));
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

        if (email === savedUser.email && password === savedUser.password) {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/kitap-işlemleri'); // Kitap işlemleri sayfasına yönlendirme
        } else {
            setError('Email veya şifre hatalı!');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Giriş Yap
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="E-posta Adresi"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Şifre"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                        />

                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Giriş Yap
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
