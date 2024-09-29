import React, { useState } from "react";
import { Modal, Paper, Typography, Grid, Stack } from "@mui/material";
import Dropzone from "../../global/dropzone";
import CustomButton from "../../global/customButon";
import CompanyDetails from "../../global/formDetails/companyDetails";
import ContactDetails from "../../global/formDetails/contactDetails";
import PersonalDetails from "../../global/formDetails/personalDetails";
import AddressDetails from "../../global/formDetails/addressDetails";
import { useNavigate } from "react-router-dom";
import postCorporate from "../../../redux/action/corporateActions/postCorporate";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60rem",
  height: "auto",
  p: 6,
};

const AffectCorporateModal = ({ isOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    tin: "",
    sector: "",
    website: "",
    admin: "med",
    corporateName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    tinError: false,
    sectorError: false,
    corporateNameError: false,
    emailError: false,
    phoneError: false,
    adminError: false,
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !Boolean(value),
    }));
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasErrors = false;

    const updatedErrors = {
      tinError: !Boolean(details.tin),
      sectorError: !Boolean(details.sector),
      corporateNameError: !Boolean(details.corporateName),
      emailError: !Boolean(details.email),
      phoneError: !Boolean(details.phone),
      adminError: !Boolean(details.admin),
    };

    setErrors(updatedErrors);

    Object.values(updatedErrors).forEach((error) => {
      if (error) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      try {
        const updatedDetails = {
          ...details,
        };

        await dispatch(postCorporate(updatedDetails));
        toast.success("Corporate created");
      } catch (error) {
        toast.error("Error adding corporate:", error);
      }
    }
  };
  return (
    <Modal open={isOpen} onClose={() => toggleModal(false)}>
      <Paper elevation={5} sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="h2">Add new corporate</Typography>
            </Grid>
            <Grid container justifyContent="flex-end" item xs={7}>
              <Stack direction="row" spacing={2}>
                <CustomButton className="admin-form-add-btn">Back</CustomButton>
                <CustomButton variant="contained" type="submit">
                  add
                </CustomButton>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <CompanyDetails
                title="Company Details"
                handleChange={handleChange}
                details={details}
                errors={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <Dropzone title="Company's Logo" name="companyLogo" />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AffectCorporateModal;
