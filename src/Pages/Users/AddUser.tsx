import React, { useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "../../Components/Modal.tsx";
import { UserProps } from "../../types/UserProps.ts";

interface AddUserProps {
    onAddUser: (user: { name: string; email: string; }) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAddUser }) => {
    const [user, setUser] = useState<{ name: string; email: string }>({ name: "", email: "" });
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    console.log("onAddUser nedir?", onAddUser);
    console.log("onAddUser türü:", typeof onAddUser);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(" handleSubmit çalıştı! Kullanıcı ekleme işlemi başladı...");
        console.log("Eklenmek istenen kullanıcı:", user);

        if (!user.name || !user.email) return;
        console.error(" Kullanıcı adı veya e-posta eksik!");

        onAddUser(user);
        console.log(" onAddUser fonksiyonu çağrıldı!", user);

        setUser({ name: "", email: "" });
        setOpen(false);
    };

    return (
        <div>
            <div style={{ 
                display: "flex", 
                justifyContent: "flex-end",
                padding: "20px",
                marginTop: "20px"
            }}>
                <Button 
                    onClick={() => setOpen(true)} 
                    variant="contained" 
                    size="large"
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        padding: '10px 30px',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease-in-out'
                        }
                    }}
                >
                    Yeni Kullanıcı Ekle
                </Button>
            </div>

            <CustomModal open={open} onClose={() => setOpen(false)} title="Yeni Kullanıcı Ekle">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="İsim"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginBottom: '15px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="E-posta"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        marginTop: '20px',
                        gap: '10px'
                    }}>
                        <Button 
                            onClick={() => setOpen(false)} 
                            variant="outlined" 
                            color="inherit"
                            size="large"
                        >
                            İptal
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="large"
                            sx={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                            }}
                        >
                            Ekle
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </div>
    );
};

export default AddUser;
