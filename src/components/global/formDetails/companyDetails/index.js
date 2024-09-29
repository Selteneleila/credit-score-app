import React from "react";
import {
  Typography,
  Stack,
  Checkbox,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CustomInput from "../../customInput";
import CustomSelect from "../../customSelect";

const CompanyDetails = ({ handleChange, details, errors, title }) => {
  const sectorOptions = [
    { value: "IT", label: "IT" },
    { value: "Banking", label: "Banking" },
  ];

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } });
  };
  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    handleChange({ target: { name, value: checked ? "Active" : "Inactive" } });
  };

  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={1}>
          <CustomInput
            label="Corporate Name"
            name="corporateName"
            value={details.corporateName}
            onChange={handleChange}
            error={!!errors.corporateNameError}
          />

          <CustomInput
            label="TIN"
            name="tin"
            value={details.tin}
            onChange={handleChange}
            error={!!errors.tinError}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <CustomSelect
            label="Sector"
            value={
              sectorOptions.find(({ value }) => value === details.sector)?.value
            }
            onChange={({ target: { value } }) =>
              handleSelectChange("sector", value)
            }
            options={sectorOptions}
          />
          <CustomInput
            label="Website"
            name="website"
            value={details.website}
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <CustomInput
            type="email"
            label="Email"
            name="email"
            value={details.email}
            onChange={handleChange}
            error={!!errors.emailError}
          />
          <CustomInput
            type="text"
            label="Phone"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            error={!!errors.phoneError}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
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
      </Stack>
    </>
  );
};

export default CompanyDetails;
