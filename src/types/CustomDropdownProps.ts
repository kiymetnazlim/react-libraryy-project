
export interface CustomDropdownProps {
    options: string[];
    width?: string;
    height?: string;
    position?: 'right' | 'left' | 'center'
    onSelect: (selected: string) => void;
    multiple?: boolean;
    disabled?: boolean;
    placeholder: string;
    selectedValues?: string[];
    styles?: React.CSSProperties;
}