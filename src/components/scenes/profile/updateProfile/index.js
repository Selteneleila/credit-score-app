import React, { useState } from "react";
import { Grid } from "@mui/material";
import CustomButton from "../../../global/customButon";
import Dropzone from "../../../global/dropzone";
import PersonalDetails from "../../../global/formDetails/personalDetails";
import "./index.css";
import ContactDetails from "../../../global/formDetails/contactDetails";
import AddressDetails from "../../../global/formDetails/addressDetails";

const UpdateProfile = () => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    idType: "",
    cin: "",
    passport: "",
    contactType: "",
    phoneNumber: "",
    email: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    cinError: false,
    passportError: false,
    phoneNumberError: false,
    emailError: false,
    addressError: false,
    countryError: false,

    cityError: false,
    postalCodeError: false,
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
      countryError: false,
      cityError: false,
      phoneNumberError: false,
      emailError: false,
      postalCodeError: false,
    };
    const {
      firstName,
      lastName,
      passport,
      cin,
      country,
      phoneNumber,
      city,
      email,
      address,
      postalCode,
    } = details;
    if (
      !firstName ||
      !lastName ||
      !cin ||
      passport ||
      !phoneNumber ||
      !email ||
      !country ||
      city ||
      address ||
      postalCode
    ) {
      updatedErrors = {
        firstNameError: !firstName,
        lastNameError: !lastName,
        cinError: !cin,
        passportError: !passport,
        phoneNumberError: !phoneNumber,
        emailError: !email,
        countryError: !country,
        cityError: !city,
        addressError: !address,
        postalCodeError: !postalCode,
      };
      setErrors(updatedErrors);
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid container justifyContent="flex-end" xs={12}>
          <CustomButton variant="contained">Save</CustomButton>
        </Grid>
        <Grid item xs={12}>
          <PersonalDetails
            title="Personal Informations"
            handleChange={handleChange}
            details={details}
            errors={errors}
          />
        </Grid>

        {/* <Grid item xs={6}>
          <Dropzone title="Profile picture" />
          <AddressDetails
            title="Address Details"
            handleChange={handleChange}
            details={details}
            errors={errors}
          />
        </Grid> */}
      </Grid>
    </form>
  );
};

export default UpdateProfile;
