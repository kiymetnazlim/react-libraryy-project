import React from "react";
import { BookProps } from "../../types/BookProps.ts";
import Table1 from "../../Components/Table1.tsx";

interface BookListProps {
    books: BookProps[];
    onDeleteBook: (id: number) => void;
}

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Kitap Adı", width: 180 },
    { field: "author", headerName: "Yazar", width: 180 },
];

const BookList: React.FC<BookListProps> = ({ books, onDeleteBook }) => {
    return (
        <div>
            <Table1 Column={columns} Row={books} onDelete={onDeleteBook} showDeleteButton={true} showUpdateButton={true} />
        </div>
    );
};

export default BookList;
