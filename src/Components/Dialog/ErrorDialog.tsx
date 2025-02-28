import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorDialogProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, onClose, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    borderRadius: '12px',
                    padding: '8px'
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#d32f2f'
            }}>
                <ErrorOutlineIcon />
                Uyarı
            </DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                            backgroundColor: '#b22a2a'
                        }
                    }}
                >
                    Tamam
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog; 