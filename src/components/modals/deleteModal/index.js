import React from "react";
import { Modal, Typography, Stack, Paper, useTheme } from "@mui/material";
import "./index.css";
import CustomButton from "../../global/customButon";
import { ClearOutlined, DeleteOutlined } from "@mui/icons-material";
import { tokens } from "../../../theme";

export default function DeleteModal({
  isOpen,
  toggleModal,
  handleCloseModal,
  handleDelete,
  elementId,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal open={isOpen} onClose={() => toggleModal(false)}>
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 5,
        }}
      >
        <Typography variant="h2">Delete user</Typography>
        <div>
          <Typography
            className="delete-subtitle"
            variant="h4"
            color={colors.grey[100]}
          >
            Are you sure you want to delete this user?
          </Typography>
        </div>

        <Stack className="delete-modal-btns" direction="row" spacing={2}>
          <CustomButton
            fullWidth
            onClick={handleCloseModal}
            startIcon={<ClearOutlined />}
          >
            Cancel
          </CustomButton>
          <CustomButton
            style={{ backgroundColor: colors.redAccent }}
            fullWidth
            onClick={() => {
              handleDelete(elementId);
            }}
            variant="contained"
            startIcon={<DeleteOutlined />}
          >
            Delete
          </CustomButton>
        </Stack>
      </Paper>
    </Modal>
  );
}
