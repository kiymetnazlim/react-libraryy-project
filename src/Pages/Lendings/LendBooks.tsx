import React, { useState } from 'react';
import CustomDropdown from "../../Components/CustomDropdown";
import { Button } from '@mui/material';
import Table1 from "../../Components/Table1.tsx";
import { Row } from "../../types/TableProps.ts";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface Lending {
    id: number;
    user: string;
    book: string;
    date: string;
    returnDate: string;
    status: 'active' | 'returned';
}

interface CombinedLending {
    id: number;
    user: string;
    book: string[];
    date: string;
    returnDate: string;
    status: 'active' | 'returned';
    allDates: { date: string; returnDate: string; books: string[]; status: 'active' | 'returned' }[];
}

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user", headerName: "Kullanıcı", width: 180 },
    {
        field: "book",
        headerName: "Kitap Adları",
        width: 300,
    }
];

const detailColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "book", headerName: "Kitap Adı", width: 300 },
    { field: "date", headerName: "Alış Tarihi", width: 130 },
    { field: "returnDate", headerName: "Teslim Tarihi", width: 130 }
];

const LendBooks: React.FC = () => {
    const storedUsers: { name: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userNames: string[] = storedUsers.map((user) => user.name);

    const storedBooks: { title: string }[] = JSON.parse(localStorage.getItem('books') || '[]');
    const storedLendings: Lending[] = JSON.parse(localStorage.getItem('lendings') || '[]');

    const lentBooks = storedLendings.map(lending => lending.book);
    const availableBooks = storedBooks
        .map(book => book.title)
        .filter(book => !lentBooks.includes(book));

    const [bookNames, setBookNames] = useState<string[]>(availableBooks);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [lendings, setLendings] = useState<Lending[]>(storedLendings);
    const [dropdownKey, setDropdownKey] = useState<number>(0);
    const [detailData, setDetailData] = useState<any[]>([]);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const handleUserSelect = (user: string): void => {
        setSelectedUser(user);
        setSelectedBooks([]);
    };

    const handleBookSelect = (book: string): void => {
        setSelectedBooks((prevBooks) =>
            prevBooks.includes(book) ? prevBooks.filter((b) => b !== book) : [...prevBooks, book]
        );
    };

    const combineLendings = (lendings: Lending[]): CombinedLending[] => {
        const userMap = new Map<string, CombinedLending>();

        lendings.forEach((lending) => {
            const key = lending.user;

            if (userMap.has(key)) {
                const existingLending = userMap.get(key)!;
                existingLending.book.push(lending.book);
                if (!existingLending.allDates) {
                    existingLending.allDates = [{
                        date: existingLending.date,
                        returnDate: existingLending.returnDate,
                        books: [existingLending.book[0]],
                        status: existingLending.status
                    }];
                }
                existingLending.allDates.push({
                    date: lending.date,
                    returnDate: lending.returnDate,
                    books: [lending.book],
                    status: lending.status
                });
                existingLending.status = existingLending.allDates.some(d => d.status === 'active') ? 'active' : 'returned';
            } else {
                userMap.set(key, {
                    id: lending.id,
                    user: lending.user,
                    book: [lending.book],
                    date: '',
                    returnDate: '',
                    status: lending.status,
                    allDates: [{
                        date: lending.date,
                        returnDate: lending.returnDate,
                        books: [lending.book],
                        status: lending.status
                    }]
                });
            }
        });

        return Array.from(userMap.values());
    };

    const handleDeleteLending = (id: number): void => {
        const combinedLending = combineLendings(lendings).find(lending => lending.id === id);
        if (!combinedLending) return;

        const updatedLendings = lendings.filter(lending => lending.user !== combinedLending.user);
        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);

        setBookNames(prev => [...prev, ...combinedLending.book]);
    };

    const handleSave = (): void => {
        if (!selectedUser || selectedBooks.length === 0) {
            alert("Lütfen bir kullanıcı ve en az bir kitap seçiniz.");
            return;
        }

        const currentDate = new Date();
        const returnDate = new Date(currentDate);
        returnDate.setDate(returnDate.getDate() + 10);

        const maxId = lendings.length > 0 ? Math.max(...lendings.map(l => l.id)) : 0;

        const newLendings: Lending[] = selectedBooks.map((book, index) => ({
            id: maxId + index + 1,
            user: selectedUser!,
            book: book,
            date: currentDate.toLocaleDateString(),
            returnDate: returnDate.toLocaleDateString(),
            status: 'active'
        }));

        const updatedLendings = [...lendings, ...newLendings];
        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);

        const remainingBooks = bookNames.filter((book) => !selectedBooks.includes(book));
        setBookNames(remainingBooks);

        setSelectedUser(null);
        setSelectedBooks([]);
        setDropdownKey((prevKey) => prevKey + 1);

        alert("Ödünç işlemi başarıyla kaydedildi!");
    };

    const combinedLendingsForTable = combineLendings(lendings).map(lending => ({
        ...lending,
        book: lending.book.join(', ')
    }));

    const handleUpdateLending = (updatedRow: Row): void => {
        const combinedLending = combineLendings(lendings).find(lending => lending.id === updatedRow.id);
        if (!combinedLending) return;

        const updatedLendings = lendings.map(lending => {
            if (lending.user === combinedLending.user) {
                return {
                    ...lending,
                    user: updatedRow.user
                };
            }
            return lending;
        });

        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);
        alert("Kullanıcı başarıyla güncellendi!");
    };

    const handleDetailClick = (row: Row) => {
        const selectedLending = combinedLendingsForTable.find(r => r.id === row.id);
        if (!selectedLending || !selectedLending.allDates) return;

        const detailRows = selectedLending.allDates.flatMap((dateInfo, dateIndex) =>
            dateInfo.books.map((book, bookIndex) => ({
                id: row.id + dateIndex + bookIndex,
                user: selectedLending.user,
                book: book,
                date: dateInfo.date,
                returnDate: dateInfo.returnDate,
                status: dateInfo.status
            }))
        );

        setDetailData(detailRows);
        setDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setDetailDialogOpen(false);
        setDetailData([]);
    };

    const handleReturnBook = (row: Row): void => {
        // Lending listesinde durumu güncelle
        const updatedLendings = lendings.map(lending => {
            if (lending.book === row.book &&
                lending.date === row.date &&
                lending.returnDate === row.returnDate) {
                return {
                    ...lending,
                    status: 'returned' as const
                };
            }
            return lending;
        });

        // LocalStorage'ı güncelle
        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);

        // Kitabı mevcut kitaplar listesine geri ekle
        setBookNames(prev => [...prev, row.book]);

        // Detay verilerini güncelle
        setDetailData(prev => prev.map(item => {
            if (item.id === row.id) {
                return {
                    ...item,
                    status: 'returned' as const
                };
            }
            return item;
        }));

        alert("Kitap başarıyla iade edildi!");
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                backgroundColor: '#f5f5f5',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <CustomDropdown
                    key={`user-dropdown-${dropdownKey}`}
                    options={userNames}
                    width="250px"
                    onSelect={handleUserSelect}
                    disabled={false}
                    placeholder='Kullanıcı seçiniz'
                    styles={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                />
                <CustomDropdown
                    key={`book-dropdown-${dropdownKey}`}
                    options={bookNames}
                    width="350px"
                    onSelect={handleBookSelect}
                    multiple
                    placeholder='Kitap seçiniz'
                    selectedValues={selectedBooks}
                    styles={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSave}
                    size="large"
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        padding: '10px 40px',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease-in-out'
                        }
                    }}
                >
                    Kaydet
                </Button>
            </div>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '20px'
            }}>
                <Table1
                    Column={columns}
                    Row={combinedLendingsForTable}
                    onDelete={handleDeleteLending}
                    onUpdate={handleUpdateLending}
                    onDetail={handleDetailClick}
                    showDeleteButton={true}
                    showUpdateButton={false}
                    showDetailsButton={true}
                    isUserUpdate={true}
                />
            </div>

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
                        onDelete={() => { }}
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
        </div>
    );
};

export default LendBooks;