import * as React from "react";
import { Button } from "@mui/material";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

export default function CustomButton({ children, ...rest }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { variant = "outlined" } = rest;
  const isContained = variant === "contained";
  const sx = isContained
    ? {
        bgcolor: colors.blueAccent[600],
        ":hover": {
          bgcolor: colors.blueAccent[700],
        },
      }
    : {
        borderColor: colors.blueAccent[600],
        color: colors.blueAccent[600],
        ":hover": {
          bgcolor: colors.blueAccent[900],
          borderColor: colors.blueAccent[900],
        },
      };
  return (
    <Button {...rest} variant={variant} sx={sx}>
      {children}
    </Button>
  );
}
