import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Link, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import "./index.css";
import login from "./../../assets/login.svg";
import CustomInput from "../../components/global/customInput";
import CustomButton from "../../components/global/customButon";
import CustomPaper from "../../components/global/customPaper";
import loginSticker from "../../assets/login.png";
import { useDispatch } from "react-redux";
import { authenticate } from "../../redux/action/authenticateAction/authenticate";
import { fetchAccount } from "../../redux/action/authenticateAction/fetchAccount";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    userNameError: "",
    passwordError: "",
  });

  // const handleSignUp = () => {
  //   navigate("/create_account");
  // };

  const handlePasswordReset = () => {
    navigate("/reset_password");
  };

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const inputValue = type === "checkbox" ? checked : value;
    setDetails({
      ...details,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let updatedErrors = {
      userNameError: "",
      passwordError: "",
    };
    const { userName, password } = details;

    if (!userName || !password) {
      updatedErrors = {
        userNameError: !userName ? "Username is required" : "",
        passwordError: !password ? "Password is required" : "",
      };
    } else if (userName.trim() !== "" && password.trim() !== "") {
      try {
        const response = await dispatch(authenticate(userName, password));
        if (response && response.payload) {
          navigate("/dashboard");
          return;
        } else {
          updatedErrors = {
            ...updatedErrors,
            inputError: "Invalid username or password",
          };
        }
      } catch (error) {
        console.error("Error occurred:", error);

        updatedErrors = {
          ...updatedErrors,
          inputError: "Authentication failed",
        };
      }
    }
    updatedErrors = {
      ...updatedErrors,
      inputError: "Invalid input",
    };

    setErrors(updatedErrors);
  };

  return (
    <CustomPaper>
      <div className="leftpanel">
        <img src={login} alt="" />
      </div>
      <div className="rightpanel">
        <div className="containerStyle">
          <img src={loginSticker} alt="login" style={{ width: "4rem" }} />
          <Typography variant="h2">Welcome Back!</Typography>
          <Typography variant="h5">
            Please enter your information to start using the app.
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} direction="column">
            <CustomInput
              autoFocus
              type="text"
              name="userName"
              label="Username"
              value={details.userName}
              onChange={handleChange}
              error={!!errors.userNameError}
            />
            <CustomInput
              name="password"
              label="Password"
              type="password"
              value={details.password}
              onChange={handleChange}
              error={!!errors.passwordError}
            />
          </Stack>
          <div className="password-link">
            <Link onClick={handlePasswordReset} color={colors.grey[300]}>
              <Typography variant="h6">Forgot my password</Typography>
            </Link>
          </div>
          <div className="login-btn">
            <CustomButton variant="contained" fullWidth type="submit">
              Sign IN
            </CustomButton>
          </div>
        </form>
        {/* <div className="create-account-container">
          <Typography variant="h5">
            Don't have an account yet?
            <Link
              style={{ textDecoration: "none" }}
              className="create-account-link"
              color={colors.blueAccent[700]}
              onClick={handleSignUp}
            >
              Sign up here
            </Link>
          </Typography>
        </div> */}
      </div>
    </CustomPaper>
  );
};

export default Login;
