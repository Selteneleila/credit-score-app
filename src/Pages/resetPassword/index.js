import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, Link, Typography } from "@mui/material";
import { tokens } from "../../theme";
import "./index.css";
import resetPassword from "../../assets/reset-password.png";
import reset from "./../../assets/reset.svg";
import CustomPaper from "../../components/global/customPaper";
import SendEmail from "../../components/scenes/resetPasswordComponents/sendEmail";
import VerificationCode from "../../components/scenes/resetPasswordComponents/verificationCode";
import SetNewPassword from "../../components/scenes/resetPasswordComponents/setNewPassword";

const ResetPassword = () => {
  const nextStepByCurrentStep = {
    enterEmail: "verificationCode",
    verificationCode: "newPassword",
    newPassword: "goToHome",
  };
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [componentToShow, setComponentToShow] = useState("enterEmail");

  const handleNextStepButton = () => {
    const nextStep = nextStepByCurrentStep[componentToShow];
    if (nextStep !== "goToHome") {
      setComponentToShow(nextStep);
      return;
    }
    navigate("/dashboard");
  };

  const displayedComponent = {
    enterEmail: <SendEmail handleNextStepButton={handleNextStepButton} />,
    verificationCode: (
      <VerificationCode handleNextStepButton={handleNextStepButton} />
    ),
    newPassword: <SetNewPassword handleNextStepButton={handleNextStepButton} />,
  };

  return (
    <CustomPaper>
      <div className="reset-rightpanel">
        <img src={reset} alt="" />
      </div>
      <div className="reset-leftpanel">
        <div className="header">
          <img
            src={resetPassword}
            alt="reset password png"
            style={{ width: "4rem" }}
          />
        </div>

        {displayedComponent[componentToShow]}
        <div className="back-to-login">
          <Typography variant="h4">
            <Link
              href="/"
              color={colors.blueAccent[700]}
              style={{ textDecoration: "none" }}
            >
              Back to login!
            </Link>
          </Typography>
        </div>
      </div>
    </CustomPaper>
  );
};

export default ResetPassword;
