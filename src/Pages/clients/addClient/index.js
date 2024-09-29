import React from "react";
import { useState } from "react";
import { Typography, Stack, Grid } from "@mui/material";
import CustomButton from "../../../components/global/customButon";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../../../components/global/formDetails/personalDetails";
import AddressDetails from "../../../components/global/formDetails/addressDetails";
import ContactDetails from "../../../components/global/formDetails/contactDetails";
// import Dropzone from "../../../components/global/dropzone";
import CustomSelect from "../../../components/global/customSelect";
import { postAddress } from "../../../redux/action/addressActions/postAddress";
import { useDispatch, useSelector } from "react-redux";
import { postClient } from "../../../redux/action/clientActions/postClient";
import dayjs from "dayjs";

const AddClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contactTypes, setContactTypes] = useState([]);

  const [selectedValue, setSelectedValue] = useState("");
  const token = useSelector((state) => state.auth.token);

  const accountTypeOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
    { value: "Agent", label: "Agent" },
  ];

  const handleCancelClick = () => {
    navigate("/dashboard/clients");
  };
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    idType: "",
    contactType: "",
    cin: "",
    passport: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    admin: "",
    gender: "Female",
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
    cityError: false,
    phoneError: false,
    emailError: false,
    adminError: false,
    genderError: false,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const formattedBirthDate =
      name === "birthDate" ? dayjs(value).format("YYYY/MM/DD") : value;

    const cityValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setErrors({
      ...errors,
      [`${name}Error`]: !Boolean(value),
    });
    setDetails({
      ...details,
      [name]: cityValue,
    });
  };

  const formatDetailsToPayload = (address) => {
    const contactEmail = contactTypes.find((type) => type.contact === "Email");
    const contactPhone = contactTypes.find((type) => type.contact === "Phone");
    return {
      ...details,
      contactType: contactTypes[0].contact,
      email: contactEmail.value || "",
      phone: contactPhone.value || "",
      address,
      creditReport: null,
      creditScore: null,
      pictureContentType: "",
      picture: "",
    };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const addressData = {
        street: details.address,
        city: details.city,
        postalCode: details.postalCode,
      };
      const createdAddress = await dispatch(postAddress(addressData));
      if (!createdAddress) {
        console.error("Address creation failed");
        return;
      }
      const clientData = formatDetailsToPayload(createdAddress);
      clientData.accountType = "Client";
      await dispatch(postClient(clientData));

      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Client creation failed:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h2"> Add new client</Typography>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={7}>
          <Stack direction="row" spacing={2}>
            <CustomButton
              onClick={handleCancelClick}
              className="admin-form-add-btn"
            >
              Back
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
          <PersonalDetails
            title="Personal Informations"
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
          <AddressDetails
            title="Address Details"
            handleChange={handleChange}
            details={details}
            errors={errors}
          />
          <Typography variant="h5">Account Type</Typography>
          <CustomSelect
            name="accountType"
            value={
              accountTypeOptions.find(
                ({ value }) => value === details.accountType
              )?.value
            }
            onChange={({ target: { value } }) =>
              handleSelectChange("accountType", value)
            }
            error={!!errors.cityError}
            options={accountTypeOptions}
          />
          {/* <Dropzone title="Profile Picture" /> */}
        </Grid>
      </Grid>
    </form>
  );
};

export default AddClient;
