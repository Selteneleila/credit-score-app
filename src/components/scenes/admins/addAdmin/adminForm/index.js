import React from "react";
import { useState } from "react";
import { tokens } from "../../../../../theme";
import { Typography, Stack, useTheme, IconButton, Grid } from "@mui/material";
import Dropzone from "../../../../global/dropzone";
import { AddOutlined } from "@mui/icons-material";
import "./index.css";
import AffectCorporateModal from "../../../../modals/affectCorporateModal";
import PersonalDetails from "../../../../global/formDetails/personalDetails";
import ContactDetails from "../../../../global/formDetails/contactDetails";
import AddressDetails from "../../../../global/formDetails/addressDetails";
import CustomSelect from "../../../../global/customSelect";
const AdminForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const toggleModal = () => setIsAdminModalOpen(!isAdminModalOpen);
  const [contactTypes, setContactTypes] = useState([]);
  const handleOpenModal = () => setIsAdminModalOpen(true);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    idType: "",
    contactType: "",
    cin: "",
    passport: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    corporate: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    idTypeError: false,
    contactTypeError: false,
    cinError: false,
    passportError: false,
    addressError: false,
    postalCodeError: false,
    phoneNumberError: false,
    emailError: false,
    corporateError: false,
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
      idTypeError: false,
      contactTypeError: false,
      cinError: false,
      passportError: false,
      addressError: false,
      postalCodeError: false,
      phoneNumberError: false,
      emailError: false,
      corporateError: false,
    };
    const {
      firstName,
      lastName,
      cin,
      passport,
      address,
      postalCode,
      phoneNumber,
      email,
      corporate,
    } = details;
    if (
      !firstName ||
      !lastName ||
      !cin ||
      !passport ||
      !address ||
      !postalCode ||
      !phoneNumber ||
      !email ||
      !corporate
    ) {
      updatedErrors = {
        firstNameError: !firstName,
        lastNameError: !lastName,
        cinError: !cin,
        passportError: !passport,
        addressError: !address,
        postalCodeError: !postalCode,
        phoneNumberError: !phoneNumber,
        emailError: !email,
        corporateError: !corporate,
      };
      setErrors(updatedErrors);
      return true;
    }
  };
  const corporateOptions = [
    { value: "mytek", label: "Mytek" },
    { value: "amenBank", label: "Amen Bank" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Dropzone title="Profile picture" />
          <PersonalDetails
            title="Personal Informations"
            handleChange={handleChange}
            details={details}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <AddressDetails
            title="Address Details"
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
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Affect to Corporate</Typography>
          <Stack direction="row" spacing={1}>
            <CustomSelect
              options={corporateOptions}
              value={selectedValue}
              onChange={handleSelectChange}
              error={!!errors.corporateError}
            />
            <IconButton onClick={handleOpenModal}>
              <AddOutlined sx={{ color: colors.blueAccent[700] }} />
            </IconButton>
            <AffectCorporateModal
              isOpen={isAdminModalOpen}
              toggleModal={toggleModal}
            />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default AdminForm;
