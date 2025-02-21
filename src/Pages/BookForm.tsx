import React, { useState, useEffect } from "react";
import Button from "../Components/Button.tsx";
import { Book } from "../DTO/BookDTO.ts";
import Table1 from "../Components/Table1.tsx";
import CustomModal from "../Components/Modal.tsx";
import "../static/BookForm.css"; 

const BookForm: React.FC = () => {
    const [book, setBook] = useState<{ title: string; author: string }>({ title: "", author: "" });
    const [books, setBooks] = useState<Book[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedBooks = localStorage.getItem("books");
        if (storedBooks) {
            const parsedBooks = JSON.parse(storedBooks).map((b: Book, index: number) => ({
                id: index + 1,
                ...b,
            }));
            setBooks(parsedBooks);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const storedBooks = localStorage.getItem("books");
        const booksList = storedBooks ? JSON.parse(storedBooks) : [];

        const newBook = { id: booksList.length + 1, ...book };
        const updatedBooks = [...booksList, newBook];

        localStorage.setItem("books", JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        setBook({ title: "", author: "" });

        setOpen(false);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Kitap Adı", width: 180 },
        { field: "author", headerName: "Yazar", width: 180 },
    ]; //tip ekle

    return (
        <div className="book-form-container" >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" onClick={() => setOpen(true)} className="add-button">
                    Yeni Kitap Ekle
                </Button>
            </div>


            <CustomModal open={open} onClose={() => setOpen(false)} title="Yeni Kitap Ekle">
                <form onSubmit={handleSubmit} className="book-form">
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Kitap Adı"
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Yazar"
                        required
                        className="input-field"
                    />
                    <Button type="submit" onClick={() => { }} className="add-button">
                        Ekle
                    </Button>
                </form> 
            </CustomModal>

            <h2>Kitap Listesi</h2>
            <div style={{ height: 400, width: "100%" }}>
                <Table1 Column={columns} Row={books} />
            </div>
        </div>
    );
};

export default BookForm;
