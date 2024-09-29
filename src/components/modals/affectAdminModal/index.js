import React, { useState } from "react";
import { Modal, Paper, Typography, Grid, Stack } from "@mui/material";
import Dropzone from "../../global/dropzone";
import CustomButton from "../../global/customButon";
import ContactDetails from "../../global/formDetails/contactDetails";
import PersonalDetails from "../../global/formDetails/personalDetails";
import AddressDetails from "../../global/formDetails/addressDetails";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60rem",
  height: "auto",
  p: 6,
};

const AffectAdminModal = ({ isOpen, toggleModal }) => {
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
    <Modal open={isOpen} onClose={() => toggleModal(false)}>
      <Paper elevation={5} sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="h2">Add Admin</Typography>
            </Grid>
            <Grid container justifyContent="flex-end" item xs={7}>
              <Stack direction="row" spacing={2}>
                <CustomButton
                  onClick={() => toggleModal(false)}
                  variant="outlined"
                  className="admin-form-add-btn"
                >
                  close
                </CustomButton>
                <CustomButton
                  variant="contained"
                  className="admin-form-add-btn"
                  type="submit"
                >
                  add
                </CustomButton>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <AddressDetails
                title="Address Details "
                handleChange={handleChange}
                details={details}
                errors={errors}
              />
              <ContactDetails
                title="Contact Details"
                handleChange={handleChange}
                details={details}
                errors={errors}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AffectAdminModal;
