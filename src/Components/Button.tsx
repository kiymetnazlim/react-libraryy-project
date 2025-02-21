import React from 'react';
import { ButtonProps } from "../types/ButtonProps.ts"
import { Button } from "@mui/material";




const Button1: React.FC<ButtonProps> = ({ type, onClick, children }) => {
    return (
        <Button type={type} onClick={onClick}  variant="contained" >
            {children}
        </Button>
    );
};

export default Button1;

