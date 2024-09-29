import React, { useState } from "react";
import { TextField, InputAdornment, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import {
  Search,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

export default function CustomInput({ children, error, type, label, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const isTypePassword = type === "password";
  const isTypeSearch = type === "search";
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const EndAdornmentIcon = showPassword
    ? VisibilityOutlined
    : VisibilityOffOutlined;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <TextField
        fullWidth
        error={error}
        {...rest}
        label={label}
        variant="outlined"
        type={isTypePassword ? (showPassword ? "text" : "password") : type}
        InputProps={{
          endAdornment: isTypePassword ? (
            <InputAdornment position="end">
              <EndAdornmentIcon
                style={{
                  cursor: "pointer",
                  color: colors.blueAccent[800],
                }}
                onClick={toggleShowPassword}
              />
            </InputAdornment>
          ) : isTypeSearch ? (
            <InputAdornment position="end">
              <Search
                style={{
                  cursor: "pointer",
                  color: colors.blueAccent[800],
                }}
              />
            </InputAdornment>
          ) : null,
        }}
        sx={{
          // bgcolor: "rgba(225, 226, 254,0.2)",
          "& .MuiFormLabel-root": {
            color: colors.blueAccent[400],
          },
          "& .MuiInputBase-root": {
            color: colors.blueAccent[100],
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: colors.blueAccent[700],
            },
          },
        }}
        helperText={error && `${label} is required!`}
      >
        {children}
      </TextField>
    </>
  );
}
