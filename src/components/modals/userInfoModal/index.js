import React from "react";
import { Modal, Typography, Paper, Grid, IconButton } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { CloseOutlined } from "@mui/icons-material";
import "./index.css";
export default function UserInfoModal({
  title,
  isOpen,
  toggleModal,
  handleCloseModal,
  user,
  isCorporate,
  isClient,
  isAgent,
  isAdmin,
}) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <Typography variant="h2">{title}</Typography>
          <IconButton
            aria-label="delete"
            onClick={handleCloseModal}
            style={{ marginLeft: "100px" }}
          >
            <CloseOutlined />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isCorporate && (
              <>
                <Typography variant="h5">ID: {user?.id}</Typography>
                <Typography variant="h5">TIN: {user?.tin}</Typography>
                <Typography variant="h5">
                  Corporate Name: {user?.corporateName}
                </Typography>
                <Typography variant="h5">Sector: {user?.sector}</Typography>
                <Typography variant="h5">Status: {user?.status}</Typography>
                <Typography variant="h5">Website: {user?.website}</Typography>
                <Typography variant="h5">Email: {user?.email}</Typography>
                <Typography variant="h5">Phone: {user?.phone}</Typography>
              </>
            )}
            {isAgent && (
              <>
                <Typography variant="h5">
                  Name : {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Typography variant="h5">
                  Birth Date: {user?.birthDate}
                </Typography>
                <Typography variant="h5">Gender: {user?.gender}</Typography>
                <Typography variant="h5">CIN: {user?.cin}</Typography>
                <Typography variant="h5">
                  Passport: {user?.passport ? user?.passport : "Undefined"}
                </Typography>
                <Typography variant="h5">Phone: {user?.phone}</Typography>
                <Typography variant="h5">Email: {user?.email}</Typography>
                <Typography variant="h5">
                  Address:
                  {`${user?.address?.street},${user?.address?.city} ${user?.address?.postalCode}`}
                </Typography>
              </>
            )}
            {isClient && (
              <>
                <Typography variant="h5">
                  Name : {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Typography variant="h5">
                  Birth Date: {user?.birthDate}
                </Typography>
                <Typography variant="h5">Gender: {user?.gender}</Typography>
                <Typography variant="h5">CIN: {user?.cin}</Typography>
                <Typography variant="h5">
                  Passport: {user?.passport ? user?.passport : "Undefined"}
                </Typography>
                <Typography variant="h5">Phone: {user?.phone}</Typography>
                <Typography variant="h5">Email: {user?.email}</Typography>
                <Typography variant="h5">
                  Address:
                  {`${user?.address?.street},${user?.address?.city} ${user?.address?.postalCode}`}
                </Typography>
              </>
            )}
            {isAdmin && (
              <>
                <Typography variant="h5">
                  Name : {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Typography variant="h5">
                  Birth Date: {user?.birthDate}
                </Typography>
                <Typography variant="h5">Gender: {user?.gender}</Typography>
                <Typography variant="h5">CIN: {user?.cin}</Typography>
                <Typography variant="h5">
                  Passport: {user?.passport ? user?.passport : "Undefined"}
                </Typography>
                <Typography variant="h5">Phone: {user?.phone}</Typography>
                <Typography variant="h5">Email: {user?.email}</Typography>
                <Typography variant="h5">
                  Address:
                  {`${user?.address?.street},${user?.address?.city} ${user?.address?.postalCode}`}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
