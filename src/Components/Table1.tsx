import React from 'react';
import { TableProps } from "../DTO/TableDTO.ts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import { Paper } from '@mui/material';
import "../static/BookForm.css"; // Bu stilleri ihtiyaca göre düzenleyebilirsiniz.

const Table1: React.FC<TableProps> = ({ Column, Row }) => {
    return (
        <TableContainer component={Paper}>
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
                    {Row.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Column.map((col) => (
                                <TableCell key={col.field}>
                                    {row[col.field]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <Box display="flex" justifyContent="space-between">

                                    <Button type='submit'
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => { }}
                                    >
                                        Sil
                                    </Button>
                                    <Button type='submit'
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => { }}
                                    >
                                        Güncelle
                                    </Button>

                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Table1;
