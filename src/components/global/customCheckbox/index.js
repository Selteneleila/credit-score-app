import * as React from "react";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export default function CustomCheckbox({ checked, onChange }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      sx={{
        color: colors.blueAccent[800],
        "&.Mui-checked": {
          color: colors.blueAccent[600],
        },
      }}
    />
  );
}
