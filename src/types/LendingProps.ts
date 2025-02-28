
export interface Lending {
    id: number;
    user: string;
    book: string;
    date: string;
    returnDate: string;
    status: 'active' | 'returned';
}