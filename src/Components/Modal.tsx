import { Box, Modal, Typography } from "@mui/material";
import { CustomModalProps } from "../types/ModalProps";



const CustomModal: React.FC<CustomModalProps> = ({
    open,
    onClose,
    children,
    title,
    width = 800
}) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: width,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 8,
                    borderRadius: 10,
                }}
            >
                {title && (
                    <Typography id="modal-title" variant="h6" component="h2" mb={2}>
                        {title}  {/* modal başlığı yalnızca title olduğunda gösterilecek. */}
                    </Typography>

                )}
                {children}
            </Box>
        </Modal>
    );
};

export default CustomModal;
