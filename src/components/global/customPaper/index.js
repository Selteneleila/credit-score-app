import { Paper } from "@mui/material";
import React from "react";

const CustomPaper = ({ children }) => {
  return (
    <Paper
      className="main"
      elevation={5}
      style={{
        padding: "1rem",
        backgroundColor: "#3e4396",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        height: "40rem",
        width: "60rem",
      }}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
