import React from "react";
import { BookProps } from "../../types/BookProps.ts";
import Table1 from "../../Components/Table1.tsx"


const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Kitap Adı", width: 180 },
    { field: "author", headerName: "Yazar", width: 180 },
];

const BookList: React.FC<{ books: BookProps[] }> = ({ books }) => {
    return (

        <div >
            <Table1 Column={columns} Row={books}></Table1>

        </div>
    );
};

export default BookList;
