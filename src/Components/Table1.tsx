import React, { useState } from 'react';
import { TableProps } from "../types/TableProps.ts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TablePagination, TextField, TableSortLabel, Checkbox } from '@mui/material';
import { Paper } from '@mui/material';
import { Delete, Edit } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Fade } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface Table1Props extends TableProps {
    onDelete: (id: number) => void;
    showDeleteButton?: boolean; // Silme butonu gösterilsin mi?
    showUpdateButton?: boolean; // Güncelle butonu gösterilsin mi?
}

const Table1: React.FC<Table1Props> = ({ Column, Row, onDelete, showDeleteButton = true, showUpdateButton = true }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

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

    const filteredRows = Row.filter((row) =>
        Column.some((col) =>
            row[col.field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                        {paginatedRows.map((row, index) => (
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
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        padding: '12px',
                        maxWidth: '400px'
                    }
                }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 500 }}
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
        </>
    );
};

export default Table1;
