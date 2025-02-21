
export interface Column {
    field: string;
    headerName: string;
    width: number;
    sortable?: boolean;

}

export interface Row {
    [key: string]: any;

}

// export interface Pagination {
//     page: number;
//     pageSize: number; //sayfa başına veri sayısı
//     totalItems: number; //toplamveri sayııs
// }

export interface TableProps {
    Column: Column[];
    Row: Row[];
    // Pagination: Pagination[];



}
