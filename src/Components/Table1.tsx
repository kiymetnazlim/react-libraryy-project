import React, { useState } from 'react';
import { TableProps } from "../types/TableProps.ts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TablePagination, TextField } from '@mui/material';
import { Paper } from '@mui/material';
import { Delete } from "@mui/icons-material";

interface Table1Props extends TableProps {
    onDelete: (id: number) => void;
    showDeleteButton?: boolean; // Silme butonu gösterilsin mi?
    showUpdateButton?: boolean; // Güncelle butonu gösterilsin mi?
}

const Table1: React.FC<Table1Props> = ({ Column, Row, onDelete, showDeleteButton = true, showUpdateButton = true }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRows = Row.filter((row) =>
        Column.some((col) =>
            row[col.field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Box padding={2} display="flex" justifyContent="flex-end">
                <TextField
                    label="Ara"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        {Column.map((col) => (
                            <TableCell key={col.field} style={{ width: col.width }}>
                                {col.headerName}
                            </TableCell>
                        ))}
                        <TableCell>İşlemler</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Column.map((col) => (
                                <TableCell key={col.field}>
                                    {row[col.field]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <Box display="flex" justifyContent="space-between">
                                    {showDeleteButton && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => onDelete(row.id)}
                                            startIcon={<Delete />}
                                        >
                                            Sil
                                        </Button>
                                    )}
                                    {showUpdateButton && (
                                        <Button variant="contained" color="warning" size="small">
                                            Güncelle
                                        </Button>
                                    )}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default Table1;
