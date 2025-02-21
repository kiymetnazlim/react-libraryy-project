import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { UserProps } from "../../types/UserProps.ts";

const UserList: React.FC<{ users: UserProps[] }> = ({ users }) => {
    return (
        <div style={{ height: 400, width: "100%" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Kullanıcı Adı</TableCell>
                            <TableCell>Kullanıcı Soyadı</TableCell>
                            <TableCell>Kullanıcı Maili</TableCell>
                            <TableCell>Kullanıcı Telefonu</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow >
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;
