
export interface MyButton {
    type: "button" | "submit" | "reset";
    onClick: () => void;
    children: React.ReactNode;
    className?: String
    style?: any
    variant?:any;
    color?:any;

}