import React from "react";
import { Chip, Typography, capitalize } from "@mui/material";
import {
  CheckOutlined,
  CloseOutlined,
  DoNotDisturbAltOutlined,
  LoopOutlined,
} from "@mui/icons-material";

const StatusChip = ({ status }) => {
  return (
    <Chip
      sx={{ width: 140 }}
      variant="outlined"
      color={
        status === "Active"
          ? "success"
          : status === "Inactive"
          ? "warning"
          : status === "Suspended"
          ? "error"
          : "info"
      }
      icon={
        status === "Active" ? (
          <CheckOutlined />
        ) : status === "Inactive" ? (
          <CloseOutlined />
        ) : status === "suspended" ? (
          <DoNotDisturbAltOutlined />
        ) : status === "Pending" ? (
          <LoopOutlined />
        ) : null
      }
      label={<Typography>{capitalize(`${status}`)}</Typography>}
    ></Chip>
  );
};

export default StatusChip;
