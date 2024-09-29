import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import CustomInput from "../../../global/customInput";
import CustomButton from "../../../global/customButon";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    let updatedError = "";

    if (!password) {
      updatedError = !password;
      setPasswordError(updatedError);
      return;
    }
    navigate("/dashboard");
  };
  //TODO: add a verification function to use in handleSubmit.
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="h2">New password</Typography>
        <Stack sx={{ pt: 3 }} spacing={3} direction="column">
          <CustomInput
            fullWidth
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            label="Password"
            error={!!passwordError}
          />
          <CustomInput
            fullWidth
            type="password"
            value={password}
            name="password"
            label="Confirm Password"
            error={!!passwordError}
          />
          <div className="login-btn">
            <CustomButton variant="contained" fullWidth type="submit">
              login
            </CustomButton>
          </div>
        </Stack>
      </div>
    </form>
  );
};

export default SetNewPassword;
