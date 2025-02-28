import { Row } from "./TableProps.ts";

export interface LendBookListProps {
    combinedLendingsForTable: any[];
    handleDeleteLending: (id: number) => void;
    handleUpdateLending: (updatedRow: Row) => void;
    handleDetailClick: (row: Row) => void;
}