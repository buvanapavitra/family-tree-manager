import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteModal = ({ isOpen, onClose, onConfirm, member }) => {
  if (!isOpen || !member) return null;

  const handleDelete = () => {
    onConfirm(member.id);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to delete <strong>{member.name}</strong>?
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
