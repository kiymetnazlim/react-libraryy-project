// LendBookList.tsx
import React from 'react';
import Table1 from "../../Components/Table.tsx/Table1.tsx";
import { LendBookListProps } from '../../types/LendBookListProps';


const LendBookList: React.FC<LendBookListProps> = ({
    combinedLendingsForTable,
    handleDeleteLending,
    handleUpdateLending,
    handleDetailClick
}) => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "user", headerName: "Kullanıcı", width: 180 },
        {
            field: "book",
            headerName: "Kitap Adları",
            width: 300,
        }
    ];

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '20px'
        }}>
            <Table1
                Column={columns}
                Row={combinedLendingsForTable}
                onDelete={handleDeleteLending}
                onUpdate={handleUpdateLending}
                onDetail={handleDetailClick}
                showDeleteButton={true}
                showUpdateButton={false}
                showDetailsButton={true}
                isUserUpdate={true}
            />
        </div>
    );
};

export default LendBookList;