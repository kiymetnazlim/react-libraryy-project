import React, { useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { CustomDropdownProps } from '../types/CustomDropdownProps';
import "../assets/CustomDropdown.css"



const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    width = "200px",
    height = "40px",
    position = "left",

}) => {
    const [selectedOption, setSelectedOption] = React.useState<string>(options[0]);
    const [option, setOption] = useState<Option[]>([]);

    const handleSelect = (option: Option) => {
        setSelectedOption(option.value);
    };


    return (
        <div className={`custom-dropdown-wrapper ${position}`} style={{ width, height }}>
            <Dropdown
                options={options}
                onChange={handleSelect}
                value={selectedOption}
                placeholder="Select an option"
                className="dropdown-with-shadow"
            />
        </div>
    );
};


export default CustomDropdown;
