import React from "react";
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "../static/navbar.css";  // CSS dosyasını içe aktar

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Kütüphane Yönetim Sistemi
                </Typography>
                <Button color="inherit" component={Link} to="/kitap-işlemleri">
                    Kitap İşlemleri
                </Button>
                <Button color="inherit" component={Link} to="/kullanici-işlemleri">
                    Kullanıcı İşlemleri
                </Button>
                <Button color="inherit" component={Link} to="/ödünç-işlemleri">
                    Ödünç İşlemleri
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
