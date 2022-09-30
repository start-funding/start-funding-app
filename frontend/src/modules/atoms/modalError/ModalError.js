import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function ModalError(props) {
    
    const handleCloseModal = () => {
        props.setOpen(false)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={props.open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ERROR
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {props.modalErrorText}
                </Typography>
            </Box>
        </Modal>
    )
}