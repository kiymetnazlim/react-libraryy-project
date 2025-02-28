// Detail.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import Table1 from '../../Components/Table.tsx/Table1';
import { Row } from '../../types/TableProps';

interface DetailProps {
    detailDialogOpen: boolean;
    handleCloseDetailDialog: () => void;
    detailData: any[];
    combinedLendingsForTable: any[];
    handleUpdateLending: (updatedRow: Row) => void;
    handleReturnBook: (row: Row) => void;
}

const Detail: React.FC<DetailProps> = ({
    detailDialogOpen,
    handleCloseDetailDialog,
    detailData,
    combinedLendingsForTable,
    handleUpdateLending,
    handleReturnBook
}) => {
    const detailColumns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "book", headerName: "Kitap Adı", width: 300 },
        { field: "date", headerName: "Alış Tarihi", width: 130 },
        { field: "returnDate", headerName: "Teslim Tarihi", width: 130 }
    ];

    return (
        <Dialog
            open={detailDialogOpen}
            onClose={handleCloseDetailDialog}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #e0e0e0'
            }}>
                {detailData[0] ? `${combinedLendingsForTable.find(r => r.id === Math.floor(detailData[0].id))?.user} - Ödünç Detayları` : 'Ödünç Detayları'}
            </DialogTitle>
            <DialogContent sx={{ paddingX: 4, paddingY: 2 }}>
                <Table1
                    Column={detailColumns}
                    Row={detailData}
                    showDeleteButton={false}  
                    showUpdateButton={true}
                    showDetailsButton={false}
                    showReturnButton={true}
                    onUpdate={handleUpdateLending}
                    onReturn={handleReturnBook}

                />
            </DialogContent>
            <DialogActions sx={{
                justifyContent: 'center',
                padding: 2,
                backgroundColor: '#f5f5f5',
                borderTop: '1px solid #e0e0e0'
            }}>
                <Button
                    variant="contained"
                    onClick={handleCloseDetailDialog}
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        padding: '8px 30px',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease-in-out'
                        }
                    }}
                >
                    Kapat
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Detail;