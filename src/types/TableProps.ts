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
    onDelete?: (id: number) => void;
    onUpdate?: (row: Row) => void;
    onDetail?: (row: Row) => void;
    onReturn?: (row: Row) => void;
    showDeleteButton?: boolean;
    showUpdateButton?: boolean;
    showDetailsButton?: boolean;
    showReturnButton?: boolean;
    isUserUpdate?: boolean;
    isBookUpdate?: boolean;
    availableBooks?: string[];
}

export interface Table1Props extends TableProps { }
