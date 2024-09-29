import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { find } from "lodash";
import { useDispatch } from "react-redux";
import postCorporate from "../../../redux/action/corporateActions/postCorporate";
import { getCorporateList } from "../../../redux/action/corporateActions/getCorporateList";
import { Typography, Stack, IconButton, Grid, useTheme } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { tokens } from "../../../theme";
import CustomButton from "../../../components/global/customButon";
import CompanyDetails from "../../../components/global/formDetails/companyDetails";
import Dropzone from "../../../components/global/dropzone";
import AffectAdminModal from "../../../components/modals/affectAdminModal";
import CustomSelect from "../../../components/global/customSelect";
import { toast } from "react-toastify";

const AddCorporate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const toggleModal = () => setIsAdminModalOpen(!isAdminModalOpen);
  const handleOpenModal = () => setIsAdminModalOpen(true);

  useEffect(() => {
    dispatch(getCorporateList());
  }, [dispatch]);

  const adminOptions = [
    { value: null, label: "" },
    { value: "1", label: "Med" },
    { value: "2", label: "Ali" },
  ];

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } });
  };

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
        const adminOption = find(adminOptions, { value: details.admin });

        const updatedDetails = {
          ...details,
          admin: adminOption ? adminOption.value : null,
        };

        await dispatch(postCorporate(updatedDetails));
        toast.success("Corporate added successfully!");
        navigate("/dashboard/corporates");
      } catch (error) {
        console.error("Error adding corporate:", error);
        toast.error("Add Corporate failed!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h2">Add new corporate</Typography>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={7}>
          <Stack direction="row" spacing={2}>
            <CustomButton
              className="admin-form-add-btn"
              onClick={() => navigate("/dashboard/corporates/")}
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
        {/* <Grid item xs={6}>
          <Typography variant="h5">Affect Admin</Typography>
          <Stack direction="row" spacing={1}>
            <CustomSelect
              label="Admin"
              name="admin"
              value={
                adminOptions.find(({ value }) => value === details.admin)?.value
              }
              onChange={({ target: { value } }) =>
                handleSelectChange("admin", value)
              }
              error={!!errors.adminError}
              options={adminOptions}
            />

            <IconButton
              sx={{ color: colors.blueAccent[700] }}
              onClick={handleOpenModal}
            >
              <AddOutlined />
            </IconButton>
            <AffectAdminModal
              isOpen={isAdminModalOpen}
              toggleModal={toggleModal}
            />
          </Stack>
        </Grid> */}
      </Grid>
    </form>
  );
};

export default AddCorporate;
