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

    const handleAddBook = (book: { title: string; author: string; pageCount: number }) => {
        const lastId = books.length > 0 ? books[books.length - 1].id : 0;
        const newBook: BookProps = {
            id: lastId + 1,
            title: book.title,
            author: book.author,
            pageCount: book.pageCount
        };
        const updatedBooks = [...books, newBook];

        localStorage.setItem("books", JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
    };

    const handleDeleteBook = (id: number) => {
        const updatedBooks = books.filter(user => user.id !== id);
        localStorage.setItem("books", JSON.stringify(updatedBooks))
        setBooks(updatedBooks);
    }

    const handleUpdateBook = (updatedBook: BookProps) => {
        const updatedBooks = books.map(book =>
            book.id === updatedBook.id ? updatedBook : book
        );

        localStorage.setItem("books", JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        alert("Kitap bilgileri başarıyla güncellendi!");
    };

    return (
        <div className="book-form-container">
            <AddBook onAddBook={handleAddBook} />
            <BookList
                books={books}
                onDeleteBook={handleDeleteBook}
                onUpdateBook={handleUpdateBook}
            />
        </div>
    );
};

export default BookForm;