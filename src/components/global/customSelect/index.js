import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";

export default function CustomSelect({
  options,
  label,
  value,
  onChange,
  error,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel style={{ color: colors.blueAccent[400] }}>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{`${label} is required!`}</FormHelperText>}
    </FormControl>
  );
}
