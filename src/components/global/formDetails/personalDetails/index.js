import React from "react";
import { Typography, Stack } from "@mui/material";
import CustomInput from "../../customInput";
import CustomSelect from "../../customSelect";
import dayjs from "dayjs";
// import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
const PersonalDetails = ({ handleChange, details, errors }) => {
  const idOptions = [
    { value: "Cin", label: "CIN" },
    { value: "Passport", label: "Passport" },
  ];
  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
  ];

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } });
  };

  const renderInput = () => {
    switch (details.idType) {
      case "Cin":
        return (
          <CustomInput
            name="cin"
            label="CIN"
            error={!!errors.cinError}
            value={details.cin}
            onChange={handleChange}
            fullWidth
          />
        );
      case "Passport":
        return (
          <CustomInput
            name="passport"
            label="Passport"
            value={details.passport}
            onChange={handleChange}
            error={!!errors.passportError}
            fullWidth
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Typography variant="h5">Personal Information</Typography>
      <Stack direction="column" spacing={2}>
        <Stack spacing={1} direction="row">
          <CustomInput
            name="firstName"
            label="First Name"
            value={details.firstName}
            onChange={handleChange}
            error={!!errors.firstNameError}
          />
          <CustomInput
            name="lastName"
            label="Last Name"
            value={details.lastName}
            onChange={handleChange}
            error={!!errors.lastNameError}
          />
        </Stack>
        <Stack spacing={1} direction="row">
          <CustomInput
            name="birthDate"
            label="Birth Date"
            type="date"
            value={details.birthDate}
            onChange={handleChange}
            error={!!errors.birthDateError}
          />
          <CustomSelect
            label="Gender"
            name="gender"
            value={
              genderOptions.find(({ value }) => value === details.gender)?.value
            }
            onChange={({ target: { value } }) =>
              handleSelectChange("gender", value)
            }
            options={genderOptions}
          />
        </Stack>
        <Stack spacing={1} direction="row">
          <CustomSelect
            name="idType"
            label="ID Type"
            value={details.idType}
            onChange={({ target: { value } }) => {
              const toDelete = value === "passport" ? "cin" : "passport";
              delete details[toDelete];
              handleSelectChange("idType", value);
            }}
            options={idOptions}
          />

          {renderInput(details)}
        </Stack>
      </Stack>
    </>
  );
};

export default PersonalDetails;

{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
<DateField
  label="Birth Date"
  value={details.birthDate}
  onChange={handleChange}
  format="YYYY/MM/DD"
/>
</LocalizationProvider> */
}
