import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Paper, Divider } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import superLogin from "./../../assets/superAdmin.png";
import CustomInput from "../../components/global/customInput";
import CustomButton from "../../components/global/customButon";
import { useDispatch } from "react-redux";
import { authenticate } from "../../redux/action/authenticateAction/authenticate";

const SuperAdminLogin = () => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={5} style={{ padding: "2rem", backgroundColor: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: "4" }}>
            <Typography variant="h2">Welcome !</Typography>
            <Typography variant="h5">
              Please enter your information to start using the app.
            </Typography>
          </div>
          <img
            style={{ width: "8rem", height: "7rem", flex: "2", order: "1" }}
            src={superLogin}
            alt=""
          />
        </div>
        <Divider></Divider>

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
            <CustomButton variant="contained" fullWidth type="submit">
              Sign IN
            </CustomButton>
          </Stack>

          <div className="login-btn"></div>
        </form>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <Typography>2023 Développer avec ❤️ par Reactit Agency</Typography>
          <CopyrightIcon fontSize="small" />
        </div>
      </Paper>
    </div>
  );
};

export default SuperAdminLogin;
