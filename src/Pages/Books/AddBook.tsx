import React, { useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "../../Components/Modal.tsx";

const AddBook: React.FC<{ onAddBook: (book: { title: string; author: string }) => void }> = ({ onAddBook }) => {
    const [book, setBook] = useState<{ title: string; author: string }>({ title: "", author: "" });
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAddBook(book);

        setBook({ title: "", author: "" });
        setOpen(false);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setOpen(true)} variant="contained" color="info">
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
                    <Button type="submit" variant="contained" color="info" size="small">
                        Ekle
                    </Button>
                </form>
            </CustomModal>
        </div>
    );
};

export default AddBook;