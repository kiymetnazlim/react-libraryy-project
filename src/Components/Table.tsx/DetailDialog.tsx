import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Column, Row } from '../../types/TableProps';

interface DetailDialogProps {
    open: boolean;
    onClose: () => void;
    selectedRow: Row | null;
    Column: Column[];
}

const DetailDialog: React.FC<DetailDialogProps> = ({ open, onClose, selectedRow, Column }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Detaylar
            </DialogTitle>
            <DialogContent sx={{ paddingX: 4, paddingY: 2 }}>
                {selectedRow && Column.map((col) => (
                    <Box key={col.field} sx={{ marginBottom: 2 }}>
                        <strong>{col.headerName}:</strong> {selectedRow[col.field]}
                    </Box>
                ))}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', padding: 2 }}>
                <Button variant="contained" onClick={onClose}>
                    Kapat
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailDialog; 