import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
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
                    onClick={onClose}
                    sx={{ width: '120px' }}
                >
                    Vazgeç
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                    sx={{ width: '120px' }}
                >
                    Sil
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog; 