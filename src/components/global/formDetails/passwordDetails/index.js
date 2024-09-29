import React from "react";
import { Typography, Stack } from "@mui/material";
import CustomButton from "../../customButon";
import CustomInput from "../../customInput";

const PasswordDetails = ({ handleChange, details, errors, title }) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Stack spacing={2} direction="column">
        <CustomInput
          name="password"
          type="password"
          label="Password"
          value={details.password}
          onChange={handleChange}
          error={!!errors.passwordError}
        />
        <CustomInput
          name="password"
          type="password"
          label="Confirm Password"
          value={details.password}
          onChange={handleChange}
          error={!!errors.passwordError}
        />
        <CustomButton variant="contained">Login</CustomButton>
      </Stack>
    </>
  );
};

export default PasswordDetails;
