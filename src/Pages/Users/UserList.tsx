import React from "react";
import { UserProps } from "../../types/UserProps.ts";
import Table1 from "../../Components/Table1.tsx";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "İsim", width: 180 },
    { field: "email", headerName: "E-posta", width: 220 },
];

const UserList: React.FC<{ users: UserProps[] }> = ({ users }) => {
    return (
        <div>
            <Table1 Column={columns} Row={users} />
        </div>
    );
};

export default UserList;
