import React, { useState, useEffect } from 'react';
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
    availableBooks: string[];
}

const Detail: React.FC<DetailProps> = ({
    detailDialogOpen,
    handleCloseDetailDialog,
    detailData,
    combinedLendingsForTable,
    handleUpdateLending: updateLendingFromProps,
    handleReturnBook,
    availableBooks
}) => {
    // Ekrandaki verinin anlık olarak değişmesini sağlamak için state kullanıyoruz
    const [localDetailData, setLocalDetailData] = useState<any[]>(detailData);

    // Modal açıldığında detailData'yı local state'e yansıt
    useEffect(() => {
        setLocalDetailData(detailData);
    }, [detailData]);

    const detailColumns = [
        { field: "id", headerName: "ID", width: 70, editable: false },
        { field: "book", headerName: "Kitap Adı", width: 300, editable: true },
        { field: "date", headerName: "Alış Tarihi", width: 130, editable: true },
        { field: "returnDate", headerName: "Teslim Tarihi", width: 130, editable: true }
    ];

    const handleUpdateLending = async (updatedRow: Row) => {
        console.log("Güncelleme işlemi başlatıldı:", updatedRow);

        if (!updatedRow) {
            console.error("Hata: Güncellenecek satır bulunamadı!");
            return;
        }

        if (!updatedRow.id) {
            console.error("Hata: Güncellenecek satırın ID'si yok!");
            return;
        }

        // Türkçe tarih formatı kontrolü (DD.MM.YYYY)
        const isValidDate = (dateStr: string) => {
            if (!dateStr) return true; // Boş tarih geçerli kabul edilsin
            const pattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;
            const match = dateStr.match(pattern);

            if (!match) return false;

            const [, day, month, year] = match;
            const date = new Date(Number(year), Number(month) - 1, Number(day));

            return date.getDate() === Number(day) &&
                date.getMonth() === Number(month) - 1 &&
                date.getFullYear() === Number(year);
        };

        if (updatedRow.date && !isValidDate(updatedRow.date)) {
            console.error("Hata: Geçersiz alış tarihi formatı! Tarih formatı DD.MM.YYYY olmalıdır.", updatedRow.date);
            return;
        }

        if (updatedRow.returnDate && !isValidDate(updatedRow.returnDate)) {
            console.error("Hata: Geçersiz teslim tarihi formatı! Tarih formatı DD.MM.YYYY olmalıdır.", updatedRow.returnDate);
            return;
        }

        try {
            console.log("Güncellenecek veri:", updatedRow);

            // localStorage'dan mevcut lendings verisini al
            const lendings = JSON.parse(localStorage.getItem('lendings') || '[]');

            // Güncellenecek kaydı bul ve güncelle
            const updatedLendings = lendings.map((lending: any) =>
                lending.id === updatedRow.id ? { ...lending, ...updatedRow } : lending
            );

            // localStorage'ı güncelle
            localStorage.setItem('lendings', JSON.stringify(updatedLendings));

            // **State güncellemesi ile UI anında yenilensin**
            setLocalDetailData((prevData) =>
                prevData.map((item) =>
                    item.id === updatedRow.id ? { ...item, ...updatedRow } : item
                )
            );

            // Props'tan gelen güncelleme fonksiyonunu çağır
            updateLendingFromProps(updatedRow);

            console.log("Güncelleme başarılı! localStorage ve UI güncellendi.");
        } catch (error) {
            console.error("Güncelleme sırasında bir hata oluştu:", error);
            if (error instanceof Error) {
                console.error("Hata detayı:", error.message);
                console.error("Hata stack:", error.stack);
            }
        }
    };

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
                    Row={localDetailData}
                    showDeleteButton={false}
                    showUpdateButton={true}
                    showDetailsButton={false}
                    showReturnButton={true}
                    onUpdate={handleUpdateLending}
                    onReturn={handleReturnBook}
                    availableBooks={availableBooks}
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
