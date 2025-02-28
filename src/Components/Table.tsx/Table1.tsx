import React, { useState, useEffect } from 'react';
import { Table1Props, Row } from "../../types/TableProps.ts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, TableSortLabel } from '@mui/material';
import { Paper } from '@mui/material';
import { Delete, Edit, Info } from "@mui/icons-material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/tr';
import TableHeader from './TableHeader.tsx';
import DeleteDialog from './DeleteDialog.tsx';
import UpdateDialog from './UpdateDialog.tsx';
import DetailDialog from './DetailDialog.tsx';

const Table1: React.FC<Table1Props> = ({
    Column,
    Row,
    onDelete,
    onUpdate,
    onDetail,
    onReturn,
    showUpdateButton = true,
    showDeleteButton = true,
    showDetailsButton = false,
    showReturnButton = false,
    isUserUpdate = false,
    isBookUpdate = false,
    availableBooks = []
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [updatedRow, setUpdatedRow] = useState<Row | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [editingDates, setEditingDates] = useState<{ date: string | null; returnDate: string | null } | null>(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userNames = storedUsers.map((user: { name: string }) => user.name);
        setUsers(userNames);
    }, []);

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
        if (deleteItemId !== null && onDelete) {
            onDelete(deleteItemId);
        }
        setDeleteDialogOpen(false);
        setDeleteItemId(null);
    };

    const handleUpdateClick = (row: Row) => {
        setUpdatedRow(row);
        setEditingDates({
            date: row.date,
            returnDate: row.returnDate
        });
        setUpdateDialogOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (updatedRow && editingDates && onUpdate) {
            const updatedRowWithDates = {
                ...updatedRow,
                date: editingDates.date || updatedRow.date,
                returnDate: editingDates.returnDate || updatedRow.returnDate
            };
            onUpdate(updatedRowWithDates);
        }
        setUpdateDialogOpen(false);
        setUpdatedRow(null);
        setEditingDates(null);
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            >
                <TableHeader
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

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
                                        backgroundColor: showReturnButton ?
                                            (row.status === 'returned' ? '#f8f9fa80' : '#f8f9fa') :
                                            '#f8f9fa'
                                    },
                                    '&:hover': {
                                        backgroundColor: showReturnButton ?
                                            (row.status === 'returned' ? '#f5f5f580' : '#f5f5f5') :
                                            '#f5f5f5'
                                    },
                                    opacity: showReturnButton && row.status === 'returned' ? 0.6 : 1,
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
                                                marginRight: 1,
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
                                            disabled={showReturnButton && row.status === 'returned'}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                marginRight: 1,
                                                '&:hover': {
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            Güncelle
                                        </Button>
                                    )}
                                    {showReturnButton && (
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            onClick={() => onReturn && onReturn(row)}
                                            disabled={row.status === 'returned'}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                marginRight: 1,
                                                backgroundColor: row.status === 'returned' ? '#ed6c02' : '#4caf50',
                                                '&:hover': {
                                                    backgroundColor: row.status === 'returned' ? '#ed6c02' : '#388e3c',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            {row.status === 'returned' ? 'İade Edildi' : 'İade Et'}
                                        </Button>
                                    )}
                                    {showDetailsButton && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => onDetail && onDetail(row)}
                                            startIcon={<Info />}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                backgroundColor: '#42a5f5',
                                                '&:hover': {
                                                    backgroundColor: '#1976d2',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            Detay
                                        </Button>
                                    )}
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

            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            <UpdateDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                onConfirm={handleConfirmUpdate}
                updatedRow={updatedRow}
                setUpdatedRow={setUpdatedRow}
                editingDates={editingDates}
                setEditingDates={setEditingDates}
                Column={Column}
                isUserUpdate={isUserUpdate}
                isBookUpdate={isBookUpdate}
                users={users}
                availableBooks={availableBooks}
            />

            <DetailDialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                selectedRow={selectedRow}
                Column={Column}

            />
        </LocalizationProvider>
    );
};

export default Table1;
