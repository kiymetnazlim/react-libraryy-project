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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setOpen(true)} variant="contained" color="info">
                    Yeni Kullanıcı Ekle
                </Button>
            </div>

            <CustomModal open={open} onClose={() => setOpen(false)} title="Yeni Kullanıcı Ekle">
                <form onSubmit={handleSubmit} className="user-form">
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="İsim"
                        required
                        className="input-field"
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="E-posta"
                        required
                        className="input-field"
                    />
                    <Button type="submit" variant="contained" color="info" size="small">
                        Ekle
                    </Button>
                </form>
            </CustomModal>
        </div>
    );
};

export default AddUser;
