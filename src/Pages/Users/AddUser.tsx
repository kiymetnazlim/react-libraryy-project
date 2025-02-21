import React, { useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "../../Components/Modal.tsx";

const AddUser: React.FC = () => {
  // Modal açma/kapama state'i
  const [open, setOpen] = useState(false);

  // Kullanıcı bilgilerini tutacak state
  const [user, setUser] = useState<{
    name: string;
    surname: string;
    email: string;
    phone: string;
  }>({ name: "", surname: "", email: "", phone: "" });

  // Form gönderme fonksiyonu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { ...user, id: Date.now() };

    // Yeni kullanıcıyı ekliyoruz
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    setUser({ name: "", surname: "", email: "", phone: "" });
    setOpen(false); // Modal'ı kapatıyoruz
  };

  // Inputlardaki değeri güncelleme
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Yeni kullanıcı ekle butonu */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="info"
        >
          Yeni Kullanıcı Ekle
        </Button>
      </div>

      {/* Modal açıldığında form */}
      <CustomModal open={open} onClose={() => setOpen(false)} title="Yeni Kullanıcı Ekle">
        <form onSubmit={handleSubmit} className="book-form">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Kullanıcı Adı"
            required
            className="input-field"
          />
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
            placeholder="Soyad"
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
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Telefon Numarası"
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
