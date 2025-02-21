import React, { useState, useEffect } from "react";
import { BookProps } from "../../types/BookProps.ts";
import AddBook from "./AddBook.tsx"; // AddBook formunu import ediyoruz
import BookList from "./BookList.tsx"; // BookList'i import ediyoruz

const BookForm: React.FC = () => {
    const [books, setBooks] = useState<BookProps[]>([]);

    useEffect(() => {
        const storedBooks = localStorage.getItem("books");
        if (storedBooks) {
            const parsedBooks = JSON.parse(storedBooks).map((b: BookProps) => ({

                ...b,
            }));
            setBooks(parsedBooks);
        }
    }, []);

    const handleAddBook = (book: { title: string; author: string }) => {
        const newBook = { id: books.length + 1, ...book };
        const updatedBooks = [...books, newBook];

        localStorage.setItem("books", JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
    };

    return (
        <div className="book-form-container">
            <AddBook onAddBook={handleAddBook} />
            <h2>Kitap Listesi</h2>
            <BookList books={books} />
        </div>
    );
};

export default BookForm;
