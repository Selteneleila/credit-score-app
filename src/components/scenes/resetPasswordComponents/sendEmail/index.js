import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import CustomInput from "../../../global/customInput";
import CustomButton from "../../../global/customButon";

const SendEmail = ({ handleNextStepButton }) => {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedError = "";

    if (!email) {
      updatedError = !email ? "Please enter your email!" : "";
      setEmailError(updatedError);
      return;
    }
    handleNextStepButton();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="h2">Forgot password?</Typography>
        <Typography variant="h5">
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password.
        </Typography>
        <Stack spacing={3} direction="column">
          <CustomInput
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            label="Email"
            error={!!emailError}
          />
          <div className="login-btn">
            <CustomButton variant="contained" fullWidth type="submit">
              Send Reset instructions
            </CustomButton>
          </div>
        </Stack>
      </div>
    </form>
  );
};

export default SendEmail;
