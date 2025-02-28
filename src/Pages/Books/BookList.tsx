import React from "react";
import { BookProps } from "../../types/BookProps.ts";
import Table1 from "../../Components/Table.tsx/Table1.tsx";
import { Row } from "../../types/TableProps.ts";

interface BookListProps {
    books: BookProps[];
    onDeleteBook: (id: number) => void;
    onUpdateBook: (updatedBook: BookProps) => void;
}

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Kitap Adı", width: 180 },
    { field: "author", headerName: "Yazar", width: 180 },
];

const BookList: React.FC<BookListProps> = ({ books, onDeleteBook, onUpdateBook }) => {
    const handleUpdate = (updatedRow: Row) => {
        const updatedBook: BookProps = {
            id: updatedRow.id,
            title: updatedRow.title,
            author: updatedRow.author,
            pageCount: updatedRow.pageCount
        };
        onUpdateBook(updatedBook);
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <Table1
                Column={columns}
                Row={books}
                onDelete={onDeleteBook}
                onUpdate={handleUpdate}
                showDeleteButton={true}
                showUpdateButton={true}
            />
        </div>
    );
};

export default BookList;