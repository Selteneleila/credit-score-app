import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import {
  Typography,
  Stack,
  Grid,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CustomButton from "../../../components/global/customButon";
import PersonalDetails from "../../../components/global/formDetails/personalDetails";
import AddressDetails from "../../../components/global/formDetails/addressDetails";
import ContactDetails from "../../../components/global/formDetails/contactDetails";
import Dropzone from "../../../components/global/dropzone";
import CustomSelect from "../../../components/global/customSelect";
import AffectCorporateModal from "../../../components/modals/affectCorporateModal";
import { postAddress } from "../../../redux/action/addressActions/postAddress";
import { postAgent } from "../../../redux/action/agentActions/postAgent";
import { getCorporateList } from "../../../redux/action/corporateActions/getCorporateList";

const AddAgent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [contactTypes, setContactTypes] = useState([]);
  const [corporateOptions, setCorporateOptions] = useState([]);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    idType: "",
    contactType: "",
    cin: "",
    passport: "",
    address: "",
    postalCode: "",
    corporate: null,
    status: "",
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
  // const toggleModal = () => setIsAdminModalOpen(!isAdminModalOpen);
  // const handleOpenModal = () => setIsAdminModalOpen(true);
  const token = useSelector((state) => state.auth.token);
  const corporates = useSelector((state) => state.corporateReducer.corporates);
  useEffect(() => {
    dispatch(getCorporateList());
  }, [dispatch]);
  useEffect(() => {
    if (corporates) {
      const corporateNames = corporates.map((item) => ({
        value: item.corporateName,
        label: item.corporateName,
      }));
      setCorporateOptions(corporateNames);
    }
  }, [corporates]);

  const accountTypeOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
    { value: "Agent", label: "Agent" },
  ];

  const handleChange = ({ target }) => {
    const { name, value } = target;

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

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    handleChange({ target: { name, value: checked ? "Active" : "Inactive" } });
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
      clientData.accountType = "Agent";
      await dispatch(postAgent(clientData, token));
      navigate("/dashboard/agents");
    } catch (error) {
      console.error("Client creation failed:", error);
    }
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;

    setSelectedValue(value);

    const selectedCorporate = corporates.find(
      (corporate) => corporate.corporateName === value
    );

    setDetails((prevDetails) => ({
      ...prevDetails,
      corporate: selectedCorporate,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h2"> Add new agent</Typography>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={7}>
          <Stack direction="row" spacing={2}>
            <CustomButton
              onClick={() => navigate("/dashboard/agents/")}
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
            details={details.address}
            errors={errors}
          />
          {/* <Dropzone title="Profile Picture" /> */}
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
          <Typography variant="h5">Affect To Corporate</Typography>
          <Stack direction="row" spacing={1}>
            <CustomSelect
              label="Corporate"
              value={selectedValue}
              onChange={handleSelectChange}
              error={!!errors.corporateError}
              options={corporateOptions}
            />
            {/* <IconButton onClick={handleOpenModal}>
              <AddOutlined />
            </IconButton>
            <AffectCorporateModal
              isOpen={isAdminModalOpen}
              toggleModal={toggleModal}
            /> */}
          </Stack>
          <Stack direction="row" spacing={4}>
            <Typography variant="h5">Status</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={details.status === "Active"}
                  onChange={handleSwitchChange}
                  name="status"
                  color="secondary"
                />
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAgent;
