import React from "react";
import { Typography, Stack } from "@mui/material";
import CustomInput from "../../customInput";
import CustomSelect from "../../customSelect";

const AddressDetails = ({ handleChange, details, errors, title }) => {
  const cityOptions = [
    { value: "Sousse", label: "Sousse" },
    { value: "Tunis", label: "Tunis" },
  ];

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } });
  };

  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Stack direction="column" spacing={2}>
        <CustomInput
          name="address"
          label="Address"
          value={details.address}
          onChange={handleChange}
          error={!!errors.addressError}
        />
        <Stack spacing={1} direction="row">
          <CustomSelect
            label="City"
            name="city"
            value={
              cityOptions.find(({ value }) => value === details.city)?.value
            }
            onChange={({ target: { value } }) =>
              handleSelectChange("city", value)
            }
            error={!!errors.cityError}
            options={cityOptions}
          />

          <CustomInput
            name="postalCode"
            label="Postal Code"
            value={details.postalCode}
            onChange={handleChange}
            error={!!errors.postalCodeError}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default AddressDetails;
