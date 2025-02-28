import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { Column, Row } from '../../types/TableProps';

interface UpdateDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    updatedRow: Row | null;
    setUpdatedRow: (row: Row | null) => void;
    editingDates: { date: string | null; returnDate: string | null } | null;
    setEditingDates: React.Dispatch<React.SetStateAction<{ date: string | null; returnDate: string | null } | null>>;
    Column: Column[];
    isUserUpdate?: boolean;
    isBookUpdate?: boolean;
    users?: string[];
    availableBooks?: string[];
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({
    open,
    onClose,
    onConfirm,
    updatedRow,
    setUpdatedRow,
    editingDates,
    setEditingDates,
    Column,
    isUserUpdate,
    isBookUpdate,
    users,
    availableBooks
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {isUserUpdate ? 'Kullanıcı Güncelle' : isBookUpdate ? 'Kitap Güncelle' : 'Güncelle'}
            </DialogTitle>
            <DialogContent sx={{ paddingX: 4, paddingY: 2, minWidth: '400px' }}>
                {updatedRow && (
                    isUserUpdate ? (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Kullanıcı</InputLabel>
                            <Select
                                value={updatedRow.user || ''}
                                label="Kullanıcı"
                                onChange={(e) => {
                                    setUpdatedRow({
                                        ...updatedRow,
                                        user: e.target.value,
                                    });
                                }}
                            >
                                {users?.map((user) => (
                                    <MenuItem key={user} value={user}>
                                        {user}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : isBookUpdate ? (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Kitap</InputLabel>
                            <Select
                                value={updatedRow.book || ''}
                                label="Kitap"
                                onChange={(e) => {
                                    setUpdatedRow({
                                        ...updatedRow,
                                        book: e.target.value,
                                    });
                                }}
                            >
                                <MenuItem value={updatedRow.book}>
                                    {updatedRow.book} (Mevcut)
                                </MenuItem>
                                {availableBooks?.map((book) => (
                                    <MenuItem key={book} value={book}>
                                        {book}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                            {Column.map((col) => {
                                if (col.field === 'date' || col.field === 'returnDate') {
                                    return (
                                        <Box key={col.field} sx={{ marginTop: 2 }}>
                                            <DatePicker
                                                label={col.headerName}
                                                value={editingDates?.[col.field as 'date' | 'returnDate'] ? dayjs(editingDates[col.field as 'date' | 'returnDate'], 'DD.MM.YYYY') : null}
                                                onChange={(newValue) => {
                                                    setEditingDates((prev: { date: string | null; returnDate: string | null } | null) => ({
                                                        ...prev!,
                                                        [col.field]: newValue ? newValue.format('DD.MM.YYYY') : null
                                                    }));
                                                }}
                                                format="DD.MM.YYYY"
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        margin: "normal"
                                                    }
                                                }}
                                            />
                                        </Box>
                                    );
                                }
                                return (
                                    <TextField
                                        key={col.field}
                                        label={col.headerName}
                                        value={updatedRow[col.field] || ''}
                                        onChange={(e) => {
                                            if (col.field === 'id') return;
                                            setUpdatedRow({
                                                ...updatedRow,
                                                [col.field]: e.target.value,
                                            });
                                        }}
                                        fullWidth
                                        margin="normal"
                                        disabled={col.field === 'id'}
                                    />
                                );
                            })}
                        </LocalizationProvider>
                    )
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', padding: 2, gap: 2 }}>
                <Button variant="outlined" onClick={onClose} sx={{ width: '120px' }}>
                    Vazgeç
                </Button>
                <Button variant="contained" color="warning" onClick={onConfirm} sx={{ width: '120px' }}>
                    Güncelle
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateDialog; 