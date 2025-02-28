// LendBooks.tsx
import React, { useState } from 'react';
import LBook from './LBook'; // Yeni bileşeni import edin
import LendBookList from "./LendBookList";
import Detail from "./Detail";
import { Lending } from '../../types/LendingProps';
import { Row } from '../../types/TableProps';
import { CombinedLending } from '../../types/CombinedLendingProps';

const LendBooks: React.FC = () => {
    const storedUsers: { name: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userNames: string[] = storedUsers.map((user) => user.name);

    const storedBooks: { title: string }[] = JSON.parse(localStorage.getItem('books') || '[]');
    const storedLendings: Lending[] = JSON.parse(localStorage.getItem('lendings') || '[]');

    // Aktif olarak ödünç alınmış kitapları bul
    const activelyLentBooks = storedLendings
        .filter(lending => lending.status === 'active')
        .map(lending => lending.book);

    // Müsait kitaplar: Tüm kitaplardan aktif ödünç alınmış kitapları çıkar
    const availableBooks = storedBooks
        .map(book => book.title)
        .filter(book => !activelyLentBooks.includes(book));

    const [bookNames, setBookNames] = useState<string[]>(availableBooks);
    const [lendings, setLendings] = useState<Lending[]>(storedLendings);
    const [detailData, setDetailData] = useState<any[]>([]);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

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

    const handleUpdateLending = (updatedRow: Row): void => {
        // Güncellemeden önceki eski kitap adını bul
        const oldLending = lendings.find(lending =>
            lending.id === updatedRow.id ||
            (lending.book === updatedRow.book &&
                lending.date === updatedRow.date &&
                lending.returnDate === updatedRow.returnDate)
        );

        // Eğer kitap değiştiriliyorsa ve yeni seçilen kitap zaten aktif olarak ödünç alınmışsa engelle
        const isBookAlreadyLent = lendings.some(lending =>
            lending.book === updatedRow.book &&
            lending.status === 'active' &&
            lending.id !== updatedRow.id
        );

        if (isBookAlreadyLent) {
            alert("Bu kitap zaten başka bir kullanıcıya ödünç verilmiş!");
            return;
        }

        const updatedLendings = lendings.map(lending => {
            if (lending.id === updatedRow.id ||
                (lending.book === oldLending?.book &&
                    lending.date === updatedRow.date &&
                    lending.returnDate === updatedRow.returnDate)) {
                return {
                    ...lending,
                    ...updatedRow,
                    status: 'active' as const // Güncellenen kitabın durumunu aktif yap
                };
            }
            return lending;
        });

        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);

        // Eski kitabı müsait kitaplar listesine ekle, yeni kitabı listeden çıkar
        if (oldLending && oldLending.book !== updatedRow.book) {
            setBookNames(prev => {
                const newBooks = [...prev];
                if (!newBooks.includes(oldLending.book)) {
                    newBooks.push(oldLending.book); // Eski kitabı listeye ekle
                }
                return newBooks.filter(book => book !== updatedRow.book); // Yeni kitabı listeden çıkar
            });
        }

        alert("Ödünç bilgileri başarıyla güncellendi!");
    };

    const handleDetailClick = (row: Row) => {
        const selectedLending = combineLendings(lendings).find(r => r.id === row.id);
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

        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);

        // İade edilen kitabı müsait kitaplar listesine ekle
        if (!bookNames.includes(row.book)) {
            setBookNames(prev => [...prev, row.book]);
        }

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

    const handleSaveLendings = (newLendings: Lending[]) => {
        const updatedLendings = [...lendings, ...newLendings];
        localStorage.setItem('lendings', JSON.stringify(updatedLendings));
        setLendings(updatedLendings);

        // Sadece aktif olarak ödünç alınan kitapları listeden çıkar
        const newlyLentBooks = newLendings.map(lending => lending.book);
        const remainingBooks = bookNames.filter((book) => !newlyLentBooks.includes(book));
        setBookNames(remainingBooks);
    };

    const combinedLendingsForTable = combineLendings(lendings).map(lending => ({
        ...lending,
        book: lending.book.join(', ')
    }));

    return (
        <div style={{ padding: "20px" }}>
            <LBook
                userNames={userNames}
                bookNames={bookNames}
                onSave={handleSaveLendings}
            />

            <LendBookList
                combinedLendingsForTable={combinedLendingsForTable}
                handleDeleteLending={handleDeleteLending}
                handleUpdateLending={handleUpdateLending}
                handleDetailClick={handleDetailClick}
            />

            <Detail
                detailDialogOpen={detailDialogOpen}
                handleCloseDetailDialog={handleCloseDetailDialog}
                detailData={detailData}
                combinedLendingsForTable={combinedLendingsForTable}
                handleUpdateLending={handleUpdateLending}
                handleReturnBook={handleReturnBook}
                availableBooks={[
                    ...availableBooks, // Sadece müsait kitaplar
                    ...detailData.map(item => item.book).filter(book =>
                        !availableBooks.includes(book)
                    ) // Mevcut seçili kitaplar (eğer müsait kitaplarda yoksa)
                ]}
            />
        </div>
    );
};

export default LendBooks;