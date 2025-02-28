import React from 'react';
import { Box, TextField } from '@mui/material';

interface TableHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <Box
            padding={2}
            display="flex"
            justifyContent="flex-end"
            bgcolor="#f5f5f5"
            borderBottom="1px solid #e0e0e0"
        >
            <TextField
                label="Ara"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px'
                    }
                }}
            />
        </Box>
    );
};

export default TableHeader; 