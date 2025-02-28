import React from "react";
import { UserProps } from "../../types/UserProps";
import Table1 from "../../Components/Table.tsx/Table1";
import { Row } from "../../types/TableProps";

interface UserListProps {
    users: UserProps[];
    onDeleteUser: (id: number) => void;
    onUpdateUser: (user: UserProps) => void;
}

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "İsim", width: 180 },
    { field: "email", headerName: "E-posta", width: 230 }
];

const UserList: React.FC<UserListProps> = ({ users, onDeleteUser, onUpdateUser }) => {
    const handleUpdate = (row: Row) => {
        onUpdateUser(row as UserProps);
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <Table1
                Column={columns}
                Row={users}
                onDelete={onDeleteUser}
                onUpdate={handleUpdate}
                showDeleteButton={true}
                showUpdateButton={true}
            />
        </div>
    );
};

export default UserList;
