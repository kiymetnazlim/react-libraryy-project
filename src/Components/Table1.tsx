import React, { useState } from 'react';
import { TableProps } from "../types/TableProps.ts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TablePagination, TextField, TableSortLabel } from '@mui/material';
import { Paper } from '@mui/material';
import { Delete, Edit } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Table1Props extends TableProps {
    onDelete: (id: number) => void;
    onUpdate?: (id: number, updatedData: Record<string, any>) => void;
    showDeleteButton?: boolean; // Silme butonu gösterilsin mi?
    showUpdateButton?: boolean; // Güncelle butonu gösterilsin mi?
}
interface Row {
    id: number;
    // Add the rest of the fields for your row
    [key: string]: any; // This will allow dynamic access to row properties
}

const Table1: React.FC<Table1Props> = ({ Column, Row, onDelete, onUpdate, showDeleteButton = true, showUpdateButton = true }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [updatedRow, setUpdatedRow] = useState<Row | null>(null);  // Update this line to use Row, not Row[]

    const handleSort = (field: string) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
    };

    const handleDeleteClick = (id: number) => {
        setDeleteItemId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteItemId !== null) {
            onDelete(deleteItemId);
        }
        setDeleteDialogOpen(false);
        setDeleteItemId(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setDeleteItemId(null);
    };

    const handleUpdateClick = (row: Row) => {
        setUpdatedRow(row);  // Set updatedRow to the clicked row object
        setUpdateDialogOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (updatedRow) {
            // Handle your update logic here
            // For example: Update your state or make an API call to update the row in the backend
            console.log('Updated row:', updatedRow);
        }
        setUpdateDialogOpen(false);
        setUpdatedRow(null);  // Clear updated row after update
    };

    const handleCancelUpdate = () => {
        setUpdateDialogOpen(false);
        setUpdatedRow(null);  // Clear updated row on cancel
    };

    const turkishToEnglish = (text: string) => {
        return text
            .replace(/ç/g, "c").replace(/Ç/g, "C")
            .replace(/ğ/g, "g").replace(/Ğ/g, "G")
            .replace(/ı/g, "i").replace(/İ/g, "I")
            .replace(/ö/g, "o").replace(/Ö/g, "O")
            .replace(/ş/g, "s").replace(/Ş/g, "S")
            .replace(/ü/g, "u").replace(/Ü/g, "U");
    };

    const filteredRows = Row.filter((row) =>
        Column.some((col) =>
            turkishToEnglish(row[col.field]?.toString().toLowerCase() || "").includes(
                turkishToEnglish(searchTerm.toLowerCase())
            )
        )
    );

    const sortedRows = [...filteredRows].sort((a, b) => {
        if (!orderBy) return 0;
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            >
                <Box
                    padding={2}
                    display="flex"
                    justifyContent="flex-end"
                    bgcolor="#f5f5f5"
                    borderBottom="1px solid #e0e0e0"
                >
                    <TextField
                        label="Ara"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px'
                            }
                        }}
                    />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                fontWeight: 'bold',
                                borderBottom: '2px solid #e0e0e0'
                            }}>
                            </TableCell>
                            {Column.map((col) => (
                                <TableCell
                                    key={col.field}
                                    style={{ width: col.width }}
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        color: '#333',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #e0e0e0'
                                    }}
                                >
                                    <TableSortLabel
                                        active={orderBy === col.field}
                                        direction={orderBy === col.field ? order : 'asc'}
                                        onClick={() => handleSort(col.field)}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                color: '#666 !important'
                                            },
                                            '&.Mui-active': {
                                                color: '#333 !important'
                                            },
                                            color: '#333 !important'
                                        }}
                                    >
                                        {col.headerName}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell sx={{
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                fontWeight: 'bold',
                                borderBottom: '2px solid #e0e0e0'
                            }}>
                                İşlemler
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: '#f8f9fa'
                                    },
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    },
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                </TableCell>
                                {Column.map((col) => (
                                    <TableCell
                                        key={col.field}
                                        sx={{ borderBottom: '1px solid #e0e0e0' }}
                                    >
                                        {row[col.field]}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <Box display="flex" gap={1}>
                                        {showDeleteButton && (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteClick(row.id)}
                                                startIcon={<Delete />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }
                                                }}
                                            >
                                                Sil
                                            </Button>
                                        )}
                                        {showUpdateButton && (
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                size="small"
                                                onClick={() => handleUpdateClick(row)}
                                                startIcon={<Edit />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }
                                                }}
                                            >
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
                    sx={{
                        borderTop: '1px solid #e0e0e0',
                        backgroundColor: '#f5f5f5'
                    }}
                />
            </TableContainer>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
            >
                <DialogTitle sx={{
                    textAlign: 'center',
                    color: '#d32f2f',
                    fontWeight: 'bold'
                }}>
                    Silme Onayı
                </DialogTitle>
                <DialogContent sx={{
                    textAlign: 'center',
                    paddingX: 4,
                    paddingY: 2
                }}>
                    Bu öğeyi silmek istediğinize emin misiniz?
                </DialogContent>
                <DialogActions sx={{
                    justifyContent: 'center',
                    padding: 2,
                    gap: 2
                }}>
                    <Button
                        variant="outlined"
                        onClick={handleCancelDelete}
                        sx={{ width: '120px' }}
                    >
                        Vazgeç
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleConfirmDelete}
                        sx={{ width: '120px' }}
                    >
                        Sil
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={updateDialogOpen} onClose={handleCancelUpdate}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Güncelle
                </DialogTitle>
                <DialogContent sx={{ paddingX: 4, paddingY: 2 }}>
                    {updatedRow && Column.map((col) => (
                        <TextField
                            key={col.field}
                            label={col.headerName}
                            value={updatedRow[col.field] || ''}
                            onChange={(e) => {
                                setUpdatedRow({
                                    ...updatedRow,
                                    [col.field]: e.target.value,
                                });
                            }}
                            fullWidth
                            margin="normal"
                        />
                    ))}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', padding: 2, gap: 2 }}>
                    <Button variant="outlined" onClick={handleCancelUpdate} sx={{ width: '120px' }}>
                        Vazgeç
                    </Button>
                    <Button variant="contained" color="warning" onClick={handleConfirmUpdate} sx={{ width: '120px' }}>
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Table1;
