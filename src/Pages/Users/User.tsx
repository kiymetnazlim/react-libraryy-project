import React, { useState, useEffect } from "react";
import { UserProps } from "../../types/UserProps.ts";
import AddUser from "./AddUser.tsx"; // Kullanıcı ekleme formu
import UserList from "./UserList.tsx"; // Kullanıcı listesini gösteren bileşen

const UserForm: React.FC = () => {
    const [users, setUsers] = useState<UserProps[]>([]);

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers).map((u: UserProps) => ({ ...u }));
            setUsers(parsedUsers);
        }
    }, []);

    const handleAddUser = (user: { name: string; email: string }) => {
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUser = { id: lastId + 1, ...user };
        const updatedUsers = [...users, newUser];

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const handleDeleteUser = (id: number) => {
        const updatedUsers = users.filter(user => user.id !== id);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    return (
        <div className="user-form-container">
            <AddUser onAddUser={handleAddUser} />
            <UserList users={users} onDeleteUser={handleDeleteUser} /> {/* Silme fonksiyonunu gönder */}
        </div>
    );
};

export default UserForm;
