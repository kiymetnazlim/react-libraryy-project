// LBook.tsx
import React, { useState } from 'react';
import CustomDropdown from "../../Components/CustomDropdown";
import { Button } from '@mui/material';
import { Lending } from '../../types/LendingProps';

interface LBookProps {
    userNames: string[];
    bookNames: string[];
    onSave: (newLendings: Lending[]) => void;
}

const LBook: React.FC<LBookProps> = ({ userNames, bookNames, onSave }) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
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

    const handleSave = (): void => {
        if (!selectedUser || selectedBooks.length === 0) {
            alert("Lütfen bir kullanıcı ve en az bir kitap seçiniz.");
            return;
        }

        const currentDate = new Date();
        const returnDate = new Date(currentDate);
        returnDate.setDate(returnDate.getDate() + 10);

        const storedLendings: Lending[] = JSON.parse(localStorage.getItem('lendings') || '[]');
        const lastId = storedLendings.length > 0 ? Math.max(...storedLendings.map(lending => lending.id)) : 0;

        const newLendings: Lending[] = selectedBooks.map((book, index) => ({
            id: lastId + index + 1, // Son ID'ye göre yeni ID atanıyor
            user: selectedUser!,
            book: book,
            date: currentDate.toLocaleDateString(),
            returnDate: returnDate.toLocaleDateString(),
            status: 'active'
        }));

        onSave(newLendings);

        setSelectedUser(null);
        setSelectedBooks([]);
        setDropdownKey((prevKey) => prevKey + 1);

        alert("Ödünç işlemi başarıyla kaydedildi!");
    };

    return (
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
    );
};

export default LBook;