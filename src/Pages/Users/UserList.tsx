import React from "react";
import { UserProps } from "../../types/UserProps.ts";
import Table1 from "../../Components/Table1.tsx";
import {    Column } from "../../types/TableProps";


interface UserListProps {
    users: UserProps[];
    onDeleteUser: (id: number) => void;
}

const columns:Column[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "İsim", width: 180 },
    { field: "email", headerName: "E-posta", width: 220 },
];

const UserList: React.FC<UserListProps> = ({ users, onDeleteUser }) => {
    return (
        <div>
            <Table1 Column={columns} Row={users} onDelete={onDeleteUser} showDeleteButton={true} showUpdateButton={true} />
        </div>
    );
};

export default UserList;
