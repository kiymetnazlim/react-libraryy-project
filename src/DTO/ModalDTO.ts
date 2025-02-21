
export interface CustomModalProps{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    showCloseButton?: boolean;
    width?: number;
}