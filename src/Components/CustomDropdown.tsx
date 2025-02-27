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
    multiple = false,
    disabled = false,
    placeholder = "Select an option",
    selectedValues = [],
}) => {
    //kullanıcı seçimlerini göstermede kullanılır. 
    //Çoklu seçim yapıldığında, bu selectedValues dizisi virgülle ayrılmış bir metin olarak kullanıcıya gösterilir.
    const [displayValue, setDisplayValue] = useState<string>('');
    //kullanıcı birkaç seçenek seçtiğinde, bu değerlerin her biri selectedValues dizisine eklenir.
    useEffect(() => {
        if (multiple && selectedValues.length > 0) {
            setDisplayValue(selectedValues.join(', '));
        } else {
            setDisplayValue('');
        }
    }, [selectedValues, multiple]);

    const handleSelect = (option: Option) => {
        onSelect(option.value);
    };

    return (
        <div className={`custom-dropdown-wrapper ${position}`} style={{ width, height }}>
            <Dropdown
                options={options}
                onChange={handleSelect}
                value={displayValue || ''}
                placeholder={placeholder}
                className="dropdown-with-shadow"
                disabled={disabled}
            />
        </div>
    );
};

export default CustomDropdown;
