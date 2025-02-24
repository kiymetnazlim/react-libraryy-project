import React, { useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "../../Components/Modal.tsx";
import { UserProps } from "../../types/UserProps";

interface AddUserProps {
    onAddUser: (user: UserProps) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAddUser }) => {
    const [user, setUser] = useState<UserProps>({ id: 0, name: "", email: "" });
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    console.log("onAddUser nedir?", onAddUser);
    console.log("onAddUser türü:", typeof onAddUser);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Yeni kullanıcı ekleniyor:", user);

        if (!user.name || !user.email) return; // Boş veri eklemeyi engelle

        onAddUser({ ...user, id: Date.now() }); // id eklenmiş hali
        setUser({ id: 0, name: "", email: "" }); // Formu temizle
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
