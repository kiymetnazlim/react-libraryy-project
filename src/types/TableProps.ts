
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

// export interface Pagination {
//     page: number;
//     pageSize: number; //sayfa başına veri sayısı
//     totalItems: number; //toplamveri sayııs
// }

export interface TableProps {
    Column: Column[];
    Row: Row[];
    onDelete?:(id:number)=>void;
    
    // Pagination: Pagination[];



}
