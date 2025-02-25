import React, { useState, useEffect } from 'react';
import CustomDropdown from "../../Components/CustomDropdown";
import { Button, Typography, Box } from '@mui/material';
import Table1 from "../../Components/Table1.tsx";

interface Lending {
    id: number;
    user: string;
    book: string;
    date: string;
}

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user", headerName: "Kullanıcı", width: 180 },
    { field: "book", headerName: "Kitap Adı", width: 180 },
    { field: "date", headerName: "Tarih", width: 180 }
];

const LendBooks: React.FC = () => {
    const storedUsers: { name: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userNames: string[] = storedUsers.map((user) => user.name);

    const storedBooks: { title: string }[] = JSON.parse(localStorage.getItem('books') || '[]');
    const [bookNames, setBookNames] = useState<string[]>(storedBooks.map((book) => book.title));

    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [lendings, setLendings] = useState<Lending[]>(
        JSON.parse(localStorage.getItem('lendings') || '[]')
    );

    const [dropdownKey, setDropdownKey] = useState<number>(0);

    const handleUserSelect = (user: string): void => {
        if (selectedUser) {
            alert("Kullanıcıyı değiştiremezsiniz, birden fazla kitap seçmek için mevcut kullanıcı ile devam edin.");
            return;
        }
        setSelectedUser(user);
    };

    const handleBookSelect = (book: string): void => {
        setSelectedBooks((prevBooks) =>
            prevBooks.includes(book) ? prevBooks.filter((b) => b !== book) : [...prevBooks, book]
        );
    };

    const handleSave = (): void => {
        if (!selectedUser || selectedBooks.length === 0) {
            alert("Lütfen bir kullanıcı ve en az bir kitap seçiniz.");
            return;
        }

        const newLendings: Lending[] = selectedBooks.map((book, index) => ({
            id: lendings.length + index + 1,
            user: selectedUser,
            book: book,
            date: new Date().toLocaleDateString()
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

    const handleDeleteLending = (id: number): void => {
        const updatedLendings = lendings.filter(lending => lending.id !== id);
        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);
    };

    return (
        <>
            <div style={styles.container}>
                <CustomDropdown
                    key={`user-dropdown-${dropdownKey}`}
                    options={userNames}
                    width="200px"
                    onSelect={handleUserSelect}
                    disabled={!!selectedUser}
                    placeholder='Kullanıcı seçiniz'
                />
                <CustomDropdown
                    key={`book-dropdown-${dropdownKey}`}
                    options={bookNames}
                    width="200px"
                    onSelect={handleBookSelect}
                    multiple
                    placeholder='Kitap seçiniz'
                />
                <Box>
                    <Typography variant="h6">
                        Seçili Kitaplar: {selectedBooks.join(", ")}
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" onClick={handleSave}>
                        Kaydet
                    </Button>
                </Box>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Table1 Column={columns} Row={lendings} onDelete={handleDeleteLending} showDeleteButton={true} showUpdateButton={false} />
            </div>
        </>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "20px"
    } as React.CSSProperties,
};

export default LendBooks;
