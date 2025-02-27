export interface Column {
    field: string;
    headerName: string;
    width: number;
    sortable?: boolean;

}

export interface Row {
    id: number;
    [key: string]: any;

}


export interface TableProps {
    Column: Column[];
    Row: Row[];
    onDelete: (id: number) => void;
    onUpdate?: (updatedRow: Row) => void;
    showDeleteButton?: boolean;
    showUpdateButton?: boolean;
    showDetailsButton?: boolean;
    dialogContent?: (row: Row) => React.ReactNode;





}
