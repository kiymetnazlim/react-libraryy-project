
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
    onUpdate?: (id: number, updatedData: Record<string, any>) => void;
    showDeleteButton?: boolean;
    showUpdateButton?: boolean;
    dialogContent?: (row: Row) => React.ReactNode;





}
