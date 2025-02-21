import React from 'react';
import { MyButton } from "../DTO/ButtonDTO.ts"



const Button: React.FC<MyButton> = ({ type, onClick, children }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
