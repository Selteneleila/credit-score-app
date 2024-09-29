import React from "react";
import { Stack, Typography } from "@mui/material";
import CustomInput from "../../../global/customInput";
import CustomButton from "../../../global/customButon";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const VerificationCode = ({ handleNextStepButton }) => {
  const [code, setCode] = useState("");
  const [errorType, setErrorType] = useState("");
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const codeToValidate = "0000";

  const verifyCode = () => {
    if (!code) {
      setErrorType("emptyField");
      return false;
    }
    if (code !== codeToValidate) {
      setErrorType("invalidCode");
      return false;
    }
    return true;
  };

  const handleResendCode = () => {
    setTimer(40);
    setIsResendDisabled(true);
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isCodeValid = verifyCode();
    isCodeValid && handleNextStepButton();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="h2">Check your mail</Typography>
        <Typography variant="h5">
          Please enter the code below to reset your password.
        </Typography>
        <Stack spacing={2} direction="column">
          <CustomInput
            fullWidth
            type="text"
            name="code"
            label="Verification code"
            error={errorType === "emptyField"}
            onChange={(event) => setCode(event.target.value)}
          />
          {errorType === "invalidCode" && (
            <span className="invalid-code">Code is invalid</span>
          )}
          <Typography variant="h6">
            <Link
              className="resend-code"
              disabled={isResendDisabled}
              onClick={handleResendCode}
            >
              {isResendDisabled ? `Resend Code in ${timer}s` : "Resend Code"}
            </Link>
          </Typography>

          <CustomButton variant="contained" onClick={handleSubmit}>
            confirm
          </CustomButton>
        </Stack>
      </div>
    </form>
  );
};

export default VerificationCode;
