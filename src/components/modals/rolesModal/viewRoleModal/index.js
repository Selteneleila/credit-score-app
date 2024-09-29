import { Box, Modal } from "@mui/material";
import React from "react";

const ViewRoleModal = ({ isModalOpen, handleClose }) => {
  return (
    <Modal open={isModalOpen} handleClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4">Role Info</Typography>
        <Typography>
          Role Name: {roleInfo.name} <br />
          Create: {roleInfo.create} <br />
          Read: {roleInfo.read} <br />
          Delete: {roleInfo.delete} <br />
          Update: {roleInfo.update} <br />
        </Typography>
      </Box>
    </Modal>
  );
};

export default ViewRoleModal;
