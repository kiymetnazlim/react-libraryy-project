import React, { useState } from 'react';
import CustomDropdown from "../../Components/CustomDropdown";
import { Button } from '@mui/material';
import Table1 from "../../Components/Table1.tsx";
import { Row } from "../../types/TableProps.ts";

interface Lending {
    id: number;
    user: string;
    book: string;
    date: string;
    returnDate: string;
}

interface CombinedLending {
    id: number;
    user: string;
    book: string[];
    date: string;
    returnDate: string;
}

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user", headerName: "Kullanıcı", width: 180 },
    {
        field: "book",
        headerName: "Kitap Adları",
        width: 300,
    },
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
        const userDateMap = new Map<string, CombinedLending>();

        lendings.forEach((lending) => {
            const key = `${lending.user}-${lending.date}`;

            if (userDateMap.has(key)) {
                const existingLending = userDateMap.get(key)!;
                existingLending.book.push(lending.book);
            } else {
                userDateMap.set(key, {
                    id: lending.id,
                    user: lending.user,
                    book: [lending.book],
                    date: lending.date,
                    returnDate: lending.returnDate
                });
            }
        });

        return Array.from(userDateMap.values());
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
            returnDate: returnDate.toLocaleDateString()
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
        const lendingToUpdate = lendings.find(lending => lending.id === updatedRow.id);
        if (lendingToUpdate) {
            const updatedLendings = lendings.map(lending => {
                if (lending.id === updatedRow.id) {
                    return {
                        ...lending,
                        date: updatedRow.date,
                        returnDate: updatedRow.returnDate
                    };
                }
                return lending;
            });

            localStorage.setItem('lendings', JSON.stringify(updatedLendings));
            setLendings(updatedLendings);
            alert("Ödünç bilgileri başarıyla güncellendi!");
        }
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
                    showDeleteButton={true}
                    showUpdateButton={true}
                />
            </div>
        </div>
    );
};

export default LendBooks;
