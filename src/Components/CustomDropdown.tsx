import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { CustomDropdownProps } from '../types/CustomDropdownProps';
import "../assets/CustomDropdown.css";

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    width = "200px",
    height = "40px",
    position = "left",
    onSelect,  
    placeholder = "Select an option", 
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    useEffect(() => {
        
        if (options.length === 0) {
            setSelectedOption(null);
        }
    }, [options]);

    const handleSelect = (option: Option) => {
        setSelectedOption(option.value);
        onSelect(option.value); //
    };

    return (
        <div className={`custom-dropdown-wrapper ${position}`} style={{ width, height }}>
            <Dropdown
                options={options}
                onChange={handleSelect}
                value={selectedOption || ''} 
                placeholder={placeholder} 
                className="dropdown-with-shadow"
            />
        </div>
    );
};

export default CustomDropdown;
