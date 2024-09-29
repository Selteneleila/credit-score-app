import { React, useState } from "react";
import "./index.css";
import { Typography, Link, useTheme, Button } from "@mui/material";
import signUp from "./../../assets/signUp.svg";
import { tokens } from "../../theme";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import member from "../../assets/member-card.png";
import password from "../../assets/padlock.png";
import PasswordDetails from "../../components/global/formDetails/passwordDetails";
import ContactDetails from "../../components/global/formDetails/contactDetails";
import PersonalDetails from "../../components/global/formDetails/personalDetails";
import AddressDetails from "../../components/global/formDetails/addressDetails";
import CustomPaper from "../../components/global/customPaper";
import map from "../../assets/map.png";

const CreateAccount = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeStep, setActiveStep] = useState(0);
  const [contactTypes, setContactTypes] = useState([]);
  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    idType: "",
    contactType: "",
    cin: "",
    passport: "",
    phoneNumber: "",
    email: "",
    tin: "",
    sector: "",
    website: "",
    admin: "",
    corporateName: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    cinError: false,
    passportError: false,
    phoneNumberError: false,
    emailError: false,
    addressError: false,
    tinError: false,
    sectorError: false,
    corporateNameError: false,
    adminError: false,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setErrors({
      ...errors,
      [name]: !Boolean(value),
    });
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedErrors = {
      firstNameError: false,
      lastNameError: false,
      birthDateError: false,
      cinError: false,
      tinError: false,
      sectorError: false,
      phoneNumberError: false,
      emailError: false,
      corporateNameError: false,
      adminError: false,
    };
    const {
      firstName,
      lastName,
      birthDate,
      cin,
      tin,
      phoneNumber,
      sector,
      email,
      corporate,
      admin,
    } = details;
    if (
      !firstName ||
      !lastName ||
      !cin ||
      !tin ||
      !phoneNumber ||
      !email ||
      !corporate ||
      admin ||
      sector
    ) {
      updatedErrors = {
        firstNameError: !firstName,
        lastNameError: !lastName,
        birthDateError: !birthDate,
        cinError: !cin,
        tinError: !tin,
        adminError: !admin,
        sectorError: !sector,
        phoneNumberError: !phoneNumber,
        emailError: !email,
        corporateNameError: !corporate,
      };
      setErrors(updatedErrors);
      return;
    }
  };

  const getHeader = (imageSource, headerTitle) => {
    const typographyStyle = { marginTop: "1rem", fontWeight: "bolder" };
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "2rem",
      paddingBottom: "0",
    };

    return (
      <div style={containerStyle}>
        <img src={imageSource} alt="map logo" style={{ width: "5rem" }} />
        <Typography style={typographyStyle} variant="h2">
          {headerTitle}
        </Typography>
      </div>
    );
  };

  const steps = {
    0: (
      <>
        {getHeader(member, "Create Account")}
        <PersonalDetails
          handleChange={handleChange}
          details={details}
          errors={errors}
        />

        <ContactDetails
          title="Contact Details "
          handleChange={setContactTypes}
          details={details}
          errors={errors}
        />
      </>
    ),
    1: (
      <>
        {getHeader(map, "Address details")}
        <AddressDetails
          handleChange={handleChange}
          details={details}
          errors={errors}
        />
      </>
    ),
    2: (
      <>
        {getHeader(password, "Password details")}
        <PasswordDetails
          handleChange={handleChange}
          details={details}
          errors={errors}
        />
      </>
    ),
  };

  return (
    <CustomPaper>
      <div className="sign-up-panel">
        <div className="steps-container">{steps[activeStep]}</div>
        <div style={{ marginTop: "15px" }}>
          <div className="stepper">
            <form onSubmit={handleSubmit}>
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>

              <Button
                style={{ float: "right" }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            </form>
          </div>

          <div className="login-link-container">
            <Typography variant="h5">
              Already have an acount ?
              <Link
                className="login-link"
                href="/"
                color={colors.blueAccent[600]}
                style={{ textDecoration: "none" }}
              >
                Login here!
              </Link>
            </Typography>
          </div>
        </div>
      </div>
      <div className="img-sign-up-panel">
        <img src={signUp} alt=""></img>
      </div>
    </CustomPaper>
  );
};

export default CreateAccount;
