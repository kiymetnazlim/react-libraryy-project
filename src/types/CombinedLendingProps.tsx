export interface CombinedLending {
    id: number;
    user: string;
    book: string[];
    date: string;
    returnDate: string;
    status: 'active' | 'returned';
    allDates: { date: string; returnDate: string; books: string[]; status: 'active' | 'returned' }[];
}