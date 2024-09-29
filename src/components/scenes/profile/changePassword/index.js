import React from "react";
import { Grid, Stack } from "@mui/material";
import CustomButton from "../../../global/customButon";
import CustomInput from "../../../global/customInput";

const ChangePassword = () => {
  return (
    <Grid container>
      <Grid container justifyContent="flex-end">
        <CustomButton variant="contained">Confirm</CustomButton>
      </Grid>
      <Grid Grid item xs={6}>
        <Grid item>
          <Stack spacing={1} direction="column">
            <CustomInput
              type="password"
              name="oldPassword"
              label="Current Password"
            />
            <CustomInput
              type="password"
              name="newPassword"
              label="New Password"
            />
            <CustomInput
              type="password"
              name="newPassword"
              label="Confirm new password"
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
